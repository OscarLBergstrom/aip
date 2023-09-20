import "../../assets/styles/create.scss";
import { useNavigate } from "react-router-dom"; 
import { useEffect } from "react";

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

  useEffect(() => {
    if(botResponse) {
      console.log("Chatbot: \n", botResponse); 
      redirect("/preview");
    }
  }, [botResponse]);

  let navigate = useNavigate();
  const redirect = (page: string) => {
    navigate(page);
  }

  return (
    <div className="create">
      <div className="card">
        <div className="title">Create playlist!</div>
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
