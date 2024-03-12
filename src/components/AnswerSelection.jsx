import "./AnswerSelection.css"
export default function AnswerSelection({ options }) {
  //  const options = props.options;

  return <div id="container">
    <select id="select">
      {options.map((o) => <option value={o}>{o}</option>)}
    </select>
    <button id="submit">submit</button>

  </div>
}
