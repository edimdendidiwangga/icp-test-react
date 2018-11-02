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
      validation: false,
      token: null
    };
    this.submiting = false
  }

  componentDidMount() {
    sessionService.loadSession()
    .then(data => {
      if (data.token) {
        this.setState({ token: data.token })
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
    const { token, name, description } = this.state;
    const nameValid = name.length > 0;
		const descValid = description.length > 0;
    const isAllValid = nameValid && descValid;
    if (isAllValid) {
      this.submiting = true;
      const data = new FormData();
      data.append('name', name);
      data.append('description', description);
      this.props.saveBook({ token, data });
    } else {
      this.setState({ validation: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { addBook } = nextProps;
    const { isFetching, isFound, isError } = addBook;

    if (!isFetching && this.submiting) {
      this.submiting = false
      if (isFound) {
        this.props.history.push('/');
        alert(addBook.data.description)
      }
      if (isError) {
        alert(addBook.message)
      }
    }
  }

  render() {
    const { name, description } = this.state;
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
            <input
              placeholder='Book Deskription'
              name="description"
              value={description}
              onChange={e => this.setState({ description: e.target.value })}
              autoComplete="off" />
              { this.renderValidation('description', 'Please insert description book') }
          </Form.Field>
          <Button type='submit' onClick={() => this.onSubmit()} >SAVE</Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  addBook: state.addBook
});

const mapDispatchToProps = dispatch => ({
	saveBook: (params) => dispatch(actionCreators.addBook(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExampleForm);


