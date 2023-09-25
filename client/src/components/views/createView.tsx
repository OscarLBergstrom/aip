import "../../assets/styles/create.scss";
import "../../assets/styles/common.scss";

interface CreateViewProps {
  userMessage: string;
  setUserMessage: (message: string) => void;
  botResponse: string;
  onSubmit: () => void;
  code: string;
  token: string;
  email: string;
  userName: string;
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
}) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="page">
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
      </div>
    </div>
  );
};

export default CreateView;
