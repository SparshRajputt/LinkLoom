import "./App.css";
import { Button } from "./components/UI/Button";
import { PlusIcon } from "./icons/plusIcon";
import { ShareIcon } from "./icons/shareIcon";

function App() {
  return (
    <>
      <Button
        variant="secondary"
        buttonSize="md"
        startIcon={<ShareIcon size="md" />}
        text="Share me"
        onClick={() => {}}
      ></Button>

      {/* space k liye bich me span use kia h  */}
      <span className="mx-2"></span>
      
      <Button
        variant="primary"
        buttonSize="md"
        startIcon={<PlusIcon size="md" />}
        text=" Add Content"
        onClick={() => {}}
      ></Button>
    </>
  );
}

export default App;
