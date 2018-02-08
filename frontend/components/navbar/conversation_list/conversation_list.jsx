import React from 'react';
import { Link } from 'react-router-dom';
import {toLocalTime} from 'util/local_time_conversion';
import { ClipLoader } from 'react-spinners';

class ConversationList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    console.log("LOG1: "+this.props)
    debugger;
    this.props.fetchConversations().then(
      (action)=>{
        const path = this.props.location.pathname;
        console.log("LOG2: "+this.props)
        debugger;
        if (path!=='/conversations/new') {
          if(this.props.conversations.length===0) {
            this.props.history.push('/conversations/new');
          }
          else {
            console.log("LOG3: "+this.props.setSocket);
            debugger;
            
            this.props.setSocket()
            .then(
              ()=>{
                if (path==="/conversations" || path==="/conversations/") {
                  const id = this.props.conversations[0].id;
                  this.props.history.push(`/conversations/${id}`);
                }
              }
            );
          }
        }
        this.setState({loading: false});
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    const path = nextProps.location.pathname;
    if(nextProps.conversations.length!==0) {
      if (path==="/conversations" || path==="/conversations/") {
        const id = nextProps.conversations[0].id;
        nextProps.history.push(`/conversations/${id}`);
      }
    }
  }

  messageBody(conversation) {
    if (conversation.message_body !== "") {
      return conversation.message_body;
    }
    else {
      return "New conversation";
    }
  }

  conversationListItem(conversation, idx) {
    return (
      <li key={idx} className="conversation-list-item">
        <Link className="conversation-item-link" to={`/conversations/${conversation.id}`}>
          <img className="latest-author-pic" src={conversation.author_pic}/>
          <div className="latest-message">
            <div className="conversation-item-header">
              <div className="conversation-title">{conversation.title}</div>
              <div className="conversation-timestamp">{toLocalTime(conversation.message_created_at)}</div>
            </div>
            <div className="latest-message-body">
              {this.messageBody(conversation)}
            </div>
          </div>
        </Link>
      </li>
    );
  }

  render() {
    const { conversations } = this.props;
    if( !this.state.loading ) {
      return(
        <ul className = "conversation-list">
          {conversations.map((conversation, idx) => (
            this.conversationListItem(conversation, idx)
          ))}
        </ul>
      );
    }
    else {
      return(
        <div className="conversation-list">
          <div className = "conversation-loader">
            <ClipLoader
              color={'#123abc'}
              loading={this.state.loading}
            />
          </div>
        </div>
      );
    }
  }
}

export default ConversationList;
