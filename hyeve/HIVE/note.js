function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // Sample Data
const sampleNotes = {
  note13234: {
    content: '<h1>Take some notes!</h1><h2>In this simple note app</h2><p><br></p><p>Click the "New Note" icon in the header and start writing your own notes!</p><p><br></p>',
    date: '04/08/2021' },

  note2: {
    content: '<h1>Have fun!</h1><h2>Write down all your important ideas</h2>',
    date: '03/08/2021' },
  }



function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}
function stripHtml(str) {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}
function orderArr(arr) {
  return arr.sort().reverse();
}


class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      notes: {},
      selectedNoteId: null,
      searchTerm: '' });_defineProperty(this, "componentDidMount",

    () => {
      this.loadSampleNotes();
    });_defineProperty(this, "loadSampleNotes",
    () => {
      const currentId = Object.keys(sampleNotes)[0];
      this.setState({
        notes: sampleNotes,
        selectedNoteId: currentId });

    });_defineProperty(this, "selectNote",
    key => {
      this.setState({
        selectedNoteId: key });

    });_defineProperty(this, "updateNote",
    updatedNote => {
      console.log("Running updateNote");
      const noteId = this.state.selectedNoteId;
      const notes = { ...this.state.notes };
      notes[noteId] = updatedNote;
      this.setState({ notes });
    });_defineProperty(this, "createNote",
    () => {
      const notes = { ...this.state.notes };
      const currentDate = new Date().toLocaleDateString("en-US");
      const newNote = { content: '', date: currentDate };

      notes[`note${Date.now()}`] = newNote;
      this.setState({
        notes: notes,
        selectedNoteId: `note${Date.now()}` });

    });_defineProperty(this, "deleteNote",
    () => {
      const notes = { ...this.state.notes };
      delete notes[this.state.selectedNoteId];
      let currentId = null;
      if (Object.keys(notes).length > 0) {
        currentId = Object.keys(notes)[0];
      }

      this.setState({
        selectedNoteId: currentId,
        notes });

    });_defineProperty(this, "updateSearch",
    term => {
      this.setState({ searchTerm: term });
    });}
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "app-wrapper" }, /*#__PURE__*/
      React.createElement(Header, {
        loadSampleNotes: this.loadSampleNotes,
        createNote: this.createNote,
        deleteNote: this.deleteNote,
        searchTerm: this.state.searchTerm,
        updateSearch: this.updateSearch }), /*#__PURE__*/

      React.createElement("main", null, /*#__PURE__*/
      React.createElement(Sidebar, {
        notes: this.state.notes,
        selectNote: this.selectNote,
        selectedNoteId: this.state.selectedNoteId,
        searchTerm: this.state.searchTerm }), /*#__PURE__*/

      React.createElement(CurrentNote, {
        notes: this.state.notes,
        selectedNoteId: this.state.selectedNoteId,
        updateNote: this.updateNote }))));




  }}


class Header extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "handleChange",
    e => {
      this.props.updateSearch(e.target.value);
    });}
  render() {
    return /*#__PURE__*/(
      React.createElement("header", null, /*#__PURE__*/
      React.createElement("input", { placeholder: "Search...", value: this.props.searchTerm, onChange: this.handleChange }), /*#__PURE__*/
      React.createElement("a", { className: "btn", onClick: this.props.createNote, title: "New Note" }, /*#__PURE__*/
      React.createElement("i", { className: "far fa-edit" })), /*#__PURE__*/

      React.createElement("a", { className: "btn", onClick: this.props.deleteNote, title: "Delete" }, /*#__PURE__*/
      React.createElement("i", { className: "far fa-trash-alt" }))));



  }}


class SidebarItem extends React.Component {
  render() {
    const {
      selectedNoteId,
      index,
      selectNote,
      notes } =
    this.props;

    const className = selectedNoteId === index ? 'selected' : '';

    const date = notes[index].date;
    const text = stripHtml(notes[index].content);
    const content = text.length === 0 ? "New Note" : truncateString(text, 15);

    return (
      React.createElement("div", { className: `note ${className}` }, 
      React.createElement("div", { className: "note-left", onClick: () => selectNote(index) }, /*#__PURE__*/
      React.createElement("p", null,
      content), 

      React.createElement("p", null,
      date))));




  }}


class Sidebar extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "renderNotes",
    key => {
      return (
        React.createElement(SidebarItem, {
          key: key,
          index: key,
          selectNote: this.props.selectNote,
          selectedNoteId: this.props.selectedNoteId,
          notes: this.props.notes }));


    });_defineProperty(this, "filteredKeys",

    () => {
      const { notes, searchTerm } = this.props;
      let filteredKeys = Object.keys(notes);

      if (filteredKeys.length > 0) {
        filteredKeys = Object.keys(notes).filter(key => {
          const content = notes[key].content.toLowerCase();
          const search = searchTerm.toLowerCase();
          return stripHtml(content).includes(search);
        });
      }
      return filteredKeys;
    });}

  render() {
    const { notes } = this.props;

    

    return (
      React.createElement("aside", { className: "sidebar" }, 
      React.createElement("div", { className: "list-of-notes" },
      this.filteredKeys().map(this.renderNotes))));



  }}


class CurrentNote extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "handleChange",
    (html, delta, source) => {
      if (source === "user") {
        const updatedNote = {
          content: html,
          date: new Date().toLocaleDateString("en-US") };

        this.props.updateNote(updatedNote);
      }
    });}
  render() {
    const { notes, selectedNoteId, updateNote } = this.props;

    if (!selectedNoteId) {
      return (
        React.createElement("div", { className: "editor editor-empty" }));

    }
    return (
      React.createElement("div", { className: "editor" }, 

      React.createElement(ReactQuill, {
        value: notes[selectedNoteId].content,
        onChange: this.handleChange })));



  }}



ReactDOM.render( React.createElement(App, null), document.querySelector('#app'));