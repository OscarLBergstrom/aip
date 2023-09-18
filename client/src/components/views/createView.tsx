import "../../assets/styles/create.scss";

interface CreateViewProps {
  userMessage: string;
  setUserMessage: (message: string) => void;
  botResponse: string;
  setBotResponse: (response: string) => void;
  onSubmit: () => void;
}

const CreateView: React.FC<CreateViewProps> = ({
  userMessage,
  setUserMessage,
  botResponse,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="create">
      <div className="card">
        <div className="title">Create HAIP!</div>
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
        </div>
      </div>
    </div>
  );
};

export default CreateView;
