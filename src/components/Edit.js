import React from 'react'
import { connect } from 'react-redux';
import { Button, Form, Container } from 'semantic-ui-react'
import { sessionService } from 'redux-react-session';
// helper
import actionCreators from '../actions/';

class FormExampleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      id: '',
      validation: false,
      token: null
    };
    this.fetching = false
    this.submiting = false
  }

  componentDidMount() {
    sessionService.loadSession()
    .then(data => {
      if (data.token) {
        this.setState({ token: data.token })
        this.fetching = true;
        this.props.getBook({ token: data.token, id: this.props.match.params.id })
      } 
      if (data.token === null || data.token === undefined) {
        this.props.history.push('/login');
      }
    })
    .catch(err => {
      this.props.history.push('/login');
    })
  }

  renderValidation(type, textFailed) {
		const { name, description, validation } = this.state;

		const nameValid = type === 'name' && name.length > 0;
		const descValid = type === 'description' && description.length > 0;
		const result = nameValid || descValid;
		return (
			validation && !result && <small style={{ color: '#ee5342' }}>{ textFailed }</small>
		);
	}

  onSubmit () {
    const { token, id, name, description } = this.state;
    const nameValid = name.length > 0;
		const descValid = description.length > 0;
    const isAllValid = nameValid && descValid;
    if (isAllValid) {
      this.submiting = true;
      const data = new FormData();
      data.append('id', id);
      data.append('name', name);
      data.append('description', description);
      this.props.editBook({ token, data });
    } else {
      this.setState({ validation: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { detailBook, updateBook } = nextProps;
    const { isFetching, isFound, isError } = updateBook;

    if (!detailBook.isFetching && this.fetching) {
      this.fetching = false
      if (detailBook.isFound) {
        const { name, description, id } = detailBook.data.data
        this.setState({ name, description, id })
      }
      if (detailBook.isError) {
        alert(updateBook.message)
      }
    }

    if (!isFetching && this.submiting) {
      this.submiting = false
      if (isFound) {
        this.props.history.push('/');
        alert(updateBook.data.description)
      }
      if (isError) {
        alert(updateBook.message)
      }
    }
  }

  render() {
    const { name, description } = this.state;
    console.log('state', this.props)
    return (
      <Container>
        <br />
        <Form>
          <Form.Field>
            <label>NAME</label>
            <input
              placeholder='Book Name'
              name="name"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              autoComplete="off" />
              { this.renderValidation('name', 'Please insert book name') }
          </Form.Field>
          <Form.Field>
            <label>DESCRIPTION</label>
            <textarea
              placeholder='Book Deskription'
              name="description"
              value={description}
              onChange={e => this.setState({ description: e.target.value })}
              autoComplete="off" />
              { this.renderValidation('description', 'Please insert description book') }
          </Form.Field>
          <Button type='submit' onClick={() => this.onSubmit()} >SAVE UPDATE</Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  detailBook: state.detailBook,
  updateBook: state.updateBook
});

const mapDispatchToProps = dispatch => ({
  getBook: (params) => dispatch(actionCreators.getBook(params)),
	editBook: (params) => dispatch(actionCreators.editBook(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExampleForm);


