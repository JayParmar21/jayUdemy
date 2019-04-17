import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Header from './component/Header/header';
//import CRoute from './component/CustomRoute/customRoute';
import HomePage from './component/HomePage/hompage';
import MyCourse from './component/Instructor/myCourse'
import AddCourse from './component/Instructor/addCourse'
import AddChapter from './component/Instructor/addChapter'
import CourseList from './component/Instructor/courseList'
import CourseByCID from './component/CourseByCatID/CourseByCatID'
import ExploreCourse from './component/CourseByCatID/ExploreCourse'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/myCourse" exact component={MyCourse} />
          <Route path="/addCourse/:courseId?" exact component={AddCourse} />
          <Route path="/addChapter/:courseId" exact component={AddChapter} />
          <Route path="/courseList" exact component={CourseList} />
          <Route path="/courseCID" exact component={CourseByCID} />
          <Route path="/exploreCourse/:courseId" exact component={ExploreCourse} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
