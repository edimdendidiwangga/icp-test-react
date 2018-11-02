import React from 'react'
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import { sessionService } from 'redux-react-session';
import { Table, Container, Button, Segment, Header, Image, Modal } from 'semantic-ui-react'
// helper
import actionCreators from '../actions/';

class ListExampleFloated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: null,
    };
    this.delete = false;
    this.logout = false;
  }

  componentDidMount() {
    sessionService.loadSession()
    .then(data => {
      if (data.token) {
        this.setState({ token: data.token });
        this.props.getUsers(data.token);
        this.props.getlistBooks(data.token);
      } 
      if (data.token === null || data.token === undefined) {
        this.props.history.push('/login');
      }
    })
    .catch(err => {
      this.props.history.push('/login');
    })
  }

  confirmDelete (id) {
    const { token } = this.state;
    if (token) {
      this.delete = true;
		  this.props.removeBook({ token, id })
    } else {
      this.props.history.push('/login');
    }
	}
  
  deleteItem (name, id) {
		const result = window.confirm(`Anda yakin akan menghapus "${name.toString()}"`)
		if (result) {
			this.confirmDelete(id)
		}
  }

  confirmLogout () {
    const { token } = this.state;
    this.logout = true
    this.props.signout(token)
  }

  toLogout () {
    const result = window.confirm(`you sure want to logout?`)
		if (result) {
			this.confirmLogout()
		}
  }

  componentWillReceiveProps(nextProps) {
    const { logout } = nextProps;

    if (!logout.isFetching && this.logout) {
      this.logout = false
      if (logout.isFound) {
        sessionService.deleteSession()
        .then(currentSession => {
          console.log('currentSession', currentSession)
          this.props.history.push('/login')
        })
      }
      if (logout.isError) {
        alert(logout.message)
      }
    }
  }

  render() {
    console.log(this.props)
    const { listBooks, users } = this.props;
    return (
      <Container>
        <br />
        <Segment clearing>
          <Header as='h2' floated='right'>
            <Modal trigger={<Button color='green'>Profile</Button>} centered={false}>
              <Modal.Header>{users.isFound && users.data.description.toUpperCase() }</Modal.Header>
              <Modal.Content image>
                <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                <Modal.Description>
                  <Header>NAME : { users.isFound && users.data.data.fullname }</Header>
                  <Header>USERNAME : { users.isFound && users.data.data.username }</Header>
                </Modal.Description>
              </Modal.Content>
            </Modal> <Button color='red' onClick={() => this.toLogout()}>LOG OUT</Button>
          </Header>
          <Header as='h2' floated='left'>
            Welcome, {users.isFound && users.data.data.fullname }
          </Header>
        </Segment>
        <Link to="/add">
          <Button primary>Add Book</Button>
        </Link>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='3'>List Books</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
    
          <Table.Body>
            {
              listBooks.isFound &&
              listBooks.data.data.books.map((item, i) => (
                <Table.Row key={i}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell collapsing textAlign='right'>
                    <Link to={`/edit/${item.id}`}><Button color='teal'>EDIT</Button></Link> 
                    {/* <Button color='red' onClick={() => this.deleteItem(item.name, item.id)}>DELETE</Button> */}
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  listBooks: state.listBooks,
  users: state.users,
  deleteBook: state.deleteBook,
  logout: state.logout,
});

const mapDispatchToProps = dispatch => ({
  getlistBooks: (params) => dispatch(actionCreators.getlistBooks(params)),
  getUsers: (params) => dispatch(actionCreators.getUsers(params)),
  removeBook: (params) => dispatch(actionCreators.removeBook(params)),
  signout: () => dispatch(actionCreators.signout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListExampleFloated);
