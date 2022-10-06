import React from "../_snowpack/pkg/react.js";
import {AppBar, Typography, Toolbar, Grid, Button, Box, TextField, TableBody, TableRow, TableCell, TableContainer, Table, Paper, TableHead} from "../_snowpack/pkg/@mui/material.js";
class Reminders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add: {
        title: "",
        notes: "",
        url: "",
        date: "",
        time: "",
        location: ""
      },
      edit: {
        title: "",
        notes: "",
        url: "",
        date: "",
        time: "",
        location: "",
        _id: ""
      },
      table: []
    };
  }
  async componentDidMount() {
    console.log("on page load");
    this.updateTable();
    console.log("updated table");
  }
  async updateTable() {
    const response = await fetch("/api/getdata", {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const json = await response.json();
    this.setState({table: json});
  }
  onAddFormChange(type, e) {
    let copyadd = {};
    switch (type) {
      case "title":
        copyadd = {...this.state.add, title: e.target.value};
        this.setState({add: copyadd});
        break;
      case "notes":
        copyadd = {...this.state.add, notes: e.target.value};
        this.setState({add: copyadd});
        break;
      case "url":
        copyadd = {...this.state.add, url: e.target.value};
        this.setState({add: copyadd});
        break;
      case "date":
        copyadd = {...this.state.add, date: e.target.value};
        this.setState({add: copyadd});
        break;
      case "time":
        copyadd = {...this.state.add, time: e.target.value};
        this.setState({add: copyadd});
        break;
      case "location":
        copyadd = {...this.state.add, location: e.target.value};
        this.setState({add: copyadd});
        break;
    }
    console.log("in add change");
    console.log(this.state.add);
  }
  onEditFormChange(type, e) {
    let copyedit = {};
    switch (type) {
      case "title":
        copyedit = {...this.state.edit, title: e.target.value};
        this.setState({edit: copyedit});
        break;
      case "notes":
        copyedit = {...this.state.edit, notes: e.target.value};
        this.setState({edit: copyedit});
        break;
      case "url":
        copyedit = {...this.state.edit, url: e.target.value};
        this.setState({edit: copyedit});
        break;
      case "date":
        copyedit = {...this.state.edit, date: e.target.value};
        this.setState({edit: copyedit});
        break;
      case "time":
        copyedit = {...this.state.edit, time: e.target.value};
        this.setState({edit: copyedit});
        break;
      case "location":
        copyedit = {...this.state.edit, location: e.target.value};
        this.setState({edit: copyedit});
        break;
    }
    console.log("in edit change");
    console.log(this.state.edit);
  }
  async submitButton(type, e) {
    if (type === "add") {
      console.log("SUBMITTING NEW DATA");
      fetch("/api/newreminder", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(this.state.add)
      }).then((response) => {
        if (response.status === 200) {
          console.log("put data into table sucessfully");
          let adds = {
            title: "",
            notes: "",
            url: "",
            date: "",
            time: "",
            location: ""
          };
          this.setState({add: adds});
          this.updateTable();
        }
      });
    } else if (type === "edit") {
      console.log("SUBMITTING EDIT DATA");
      fetch("/api/updatereminder", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(this.state.edit)
      }).then((response) => {
        if (response.status === 200) {
          console.log("succesfully posted update");
          let edits = {
            title: "",
            notes: "",
            url: "",
            date: "",
            time: "",
            location: "",
            _id: ""
          };
          this.setState({edit: edits});
          this.updateTable();
        }
      });
    }
  }
  async deleteButton(id, e) {
    console.log("DELETEING REMINDER");
    fetch("/api/deletereminder", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({_id: id})
    }).then((response) => {
      console.log("HERE");
      if (response.status === 200) {
        console.log("succesfully posted delete");
        this.updateTable();
      }
    });
  }
  editButton(title, notes, url, date, time, location, id, e) {
    console.log("LOADING INTO EDITING REMINDER");
    let edits = {title, notes, url, date, time, location, _id: id};
    console.log(edits);
    this.setState({edit: edits});
  }
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Box, {
      style: {paddingBottom: 50}
    }, /* @__PURE__ */ React.createElement(AppBar, {
      position: "static"
    }, /* @__PURE__ */ React.createElement(Toolbar, {
      variant: "dense"
    }, /* @__PURE__ */ React.createElement(Typography, {
      variant: "h6",
      color: "inherit",
      component: "div"
    }, "Reminders")))), /* @__PURE__ */ React.createElement(Grid, {
      container: true,
      direction: "row",
      justifyContent: "space-evenly",
      alignItems: "flex-start"
    }, /* @__PURE__ */ React.createElement(Box, {
      sx: {display: "flex", alignItems: "flex-start", flexDirection: "column"}
    }, /* @__PURE__ */ React.createElement(Typography, {
      variant: "h6",
      color: "inherit",
      component: "div"
    }, "Add a new reminder"), /* @__PURE__ */ React.createElement(TextField, {
      onChange: (e) => this.onAddFormChange("title", e),
      value: this.state.add.title,
      label: "Title",
      style: {paddingBottom: 10}
    }), /* @__PURE__ */ React.createElement(TextField, {
      onChange: (e) => this.onAddFormChange("notes", e),
      value: this.state.add.notes,
      label: "Notes",
      style: {paddingBottom: 10}
    }), /* @__PURE__ */ React.createElement(TextField, {
      onChange: (e) => this.onAddFormChange("url", e),
      value: this.state.add.url,
      label: "URL",
      style: {paddingBottom: 10}
    }), /* @__PURE__ */ React.createElement(TextField, {
      onChange: (e) => this.onAddFormChange("date", e),
      value: this.state.add.date,
      label: "Date",
      InputLabelProps: {shrink: true},
      type: "date",
      style: {paddingBottom: 10}
    }), /* @__PURE__ */ React.createElement(TextField, {
      onChange: (e) => this.onAddFormChange("time", e),
      value: this.state.add.time,
      label: "Time",
      InputLabelProps: {shrink: true},
      type: "time",
      style: {paddingBottom: 10}
    }), /* @__PURE__ */ React.createElement(TextField, {
      onChange: (e) => this.onAddFormChange("location", e),
      value: this.state.add.location,
      label: "Location",
      style: {paddingBottom: 10}
    }), /* @__PURE__ */ React.createElement(Button, {
      variant: "contained",
      onClick: (e) => this.submitButton("add", e)
    }, "Submit")), /* @__PURE__ */ React.createElement(Box, {
      sx: {display: "flex", alignItems: "flex-start", flexDirection: "column"}
    }, /* @__PURE__ */ React.createElement(Typography, {
      variant: "h6",
      color: "inherit",
      component: "div"
    }, "Edit a reminder"), /* @__PURE__ */ React.createElement(TextField, {
      onChange: (e) => this.onEditFormChange("title", e),
      value: this.state.edit.title,
      label: "Title",
      style: {paddingBottom: 10}
    }), /* @__PURE__ */ React.createElement(TextField, {
      onChange: (e) => this.onEditFormChange("notes", e),
      value: this.state.edit.notes,
      label: "Notes",
      style: {paddingBottom: 10}
    }), /* @__PURE__ */ React.createElement(TextField, {
      onChange: (e) => this.onEditFormChange("url", e),
      value: this.state.edit.url,
      label: "URL",
      style: {paddingBottom: 10}
    }), /* @__PURE__ */ React.createElement(TextField, {
      onChange: (e) => this.onEditFormChange("date", e),
      value: this.state.edit.date,
      label: "Date",
      InputLabelProps: {shrink: true},
      type: "date",
      style: {paddingBottom: 10}
    }), /* @__PURE__ */ React.createElement(TextField, {
      onChange: (e) => this.onEditFormChange("time", e),
      value: this.state.edit.time,
      label: "Time",
      InputLabelProps: {shrink: true},
      type: "time",
      style: {paddingBottom: 10}
    }), /* @__PURE__ */ React.createElement(TextField, {
      onChange: (e) => this.onEditFormChange("location", e),
      value: this.state.edit.location,
      label: "Location",
      style: {paddingBottom: 10}
    }), /* @__PURE__ */ React.createElement(Button, {
      variant: "contained",
      onClick: (e) => this.submitButton("edit", e)
    }, "Submit")), /* @__PURE__ */ React.createElement(Box, null, /* @__PURE__ */ React.createElement(TableContainer, {
      component: Paper
    }, /* @__PURE__ */ React.createElement(Table, {
      sx: {minWidth: 650}
    }, /* @__PURE__ */ React.createElement(TableHead, null, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableCell, null, "Delete"), /* @__PURE__ */ React.createElement(TableCell, null, "Edit"), /* @__PURE__ */ React.createElement(TableCell, null, "Title"), /* @__PURE__ */ React.createElement(TableCell, null, "Notes"), /* @__PURE__ */ React.createElement(TableCell, null, "URL"), /* @__PURE__ */ React.createElement(TableCell, null, "Date"), /* @__PURE__ */ React.createElement(TableCell, null, "Time"), /* @__PURE__ */ React.createElement(TableCell, null, "Location"))), /* @__PURE__ */ React.createElement(TableBody, null, this.state.table.map((row, index) => {
      return /* @__PURE__ */ React.createElement(TableRow, {
        key: row.name
      }, /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(Button, {
        variant: "contained",
        onClick: (e) => this.deleteButton(row._id, e)
      }, "Delete")), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(Button, {
        variant: "contained",
        onClick: (e) => this.editButton(row.title, row.notes, row.url, row.date, row.time, row.location, row._id, e)
      }, "Edit")), /* @__PURE__ */ React.createElement(TableCell, null, row.title), /* @__PURE__ */ React.createElement(TableCell, null, row.notes), /* @__PURE__ */ React.createElement(TableCell, null, row.url), /* @__PURE__ */ React.createElement(TableCell, null, row.date), /* @__PURE__ */ React.createElement(TableCell, null, row.time), /* @__PURE__ */ React.createElement(TableCell, null, row.location));
    })))))));
  }
}
export default Reminders;
