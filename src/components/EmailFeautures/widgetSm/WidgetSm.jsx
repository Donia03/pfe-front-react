import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import EmailTemplates from "../EmailTemplates";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <EmailTemplates />
    </div>
  );
}
