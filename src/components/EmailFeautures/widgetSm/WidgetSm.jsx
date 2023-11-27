import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import EmailTemplates from "../EmailTemplates";
/*Partie gauche*/
export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle"></span>

      <EmailTemplates />
    </div>
  );
}
