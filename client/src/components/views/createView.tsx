import "../../assets/styles/create.scss";

interface CreateViewProps {
  userMessage: string;
  setUserMessage: (message: string) => void;
  botResponse: string;
  onSubmit: () => void;
  code: string;
  token: string;
  email: string;
  userName: string;
  onLoad: () => void;
  onLogin: () => void;
  onToken: () => void;
  onProfile: () => void;
}

const CreateView: React.FC<CreateViewProps> = ({
  userMessage,
  setUserMessage,
  botResponse,
  onSubmit,
  code,
  token,
  email,
  userName,
  onLoad,
  onLogin,
  onToken,
  onProfile,
}) => {
  onLoad();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="create">
      <div className="card">
        <div className="title">Hello {userName}!</div>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            What kind of playlist do you want to create?
            <input
              type="text"
              name="query"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>
          <p>Chatbot: {botResponse}</p>
          <p>Code:</p>
          <p>{code}</p>
          <p>Token:</p>
          <p>{token}</p>
          <p>Email: </p>
          <p>{email}</p>
        </div>
        <button onClick={onLogin}>Test API</button>
        <button onClick={onToken}>Get token</button>
        <button onClick={onProfile}>Get profile information</button>
      </div>
    </div>
  );
};

export default CreateView;
