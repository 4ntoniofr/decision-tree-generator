function Notification({ message, setMessage, messageType, setMessageType }) {
  
  return (
    <div className={messageType}>
      <h2>{message}</h2>
    </div>
  );
}

export default Notification;
