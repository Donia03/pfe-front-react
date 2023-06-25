import "./widgetLg.css";
import SelectedUserList from "../SelectedUserList";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <SelectedUserList />
    </div>
  );
}
