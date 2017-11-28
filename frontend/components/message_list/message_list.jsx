import React from 'react';

class MessageList extends React.Component {

  constructor(props) {
    super(props);
    // this.getMessageAuthor = this.getMessageAuthor.bind(this);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    //set state to loading
    Promise.all([
      this.props.fetchMembers(1),
      this.props.fetchMessages(),
      this.props.setSocket("test")
    ]).then(()=>(this.setState({loading: false})));
  }

  // componentWillRe

  // getMessageAuthor(message) {
  //   this.state
  // }

  render() {
    const {logout, messages, members} = this.props;
    if( !this.state.loading ) {
      return(
        <div>
          <h1>You are logged in!</h1>
          <button onClick={logout}>Log Out</button>

          <h1>MESSAGES: </h1>
          <ul className="message-list">
            {
              messages.map(message => {
                const author = members[message.user_id];
                return (
                  <li className="message-list-item">
                    <div className="author-name">
                      {author.display_name}
                    </div>
                    <div className="timestamp">
                      {message.created_at}
                    </div>
                    <div className="message-body">
                      {message.body}
                    </div>

                  </li>
                );
              })
            }
          </ul>
        </div>
      );
    }
    return (
      <div>Loading...</div>
    );

  }
}

export default MessageList;

// <div className="message-author">{this.getMessageAuthor(message)}</div>
