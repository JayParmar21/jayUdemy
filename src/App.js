import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Header from './component/Header/header';
import CRoute from './component/CustomeRoute/customeroute';
import HomePage from './component/HomePage/hompage';
import MyCourse from './component/Instructor/myCourse'
import AddCourse from './component/Instructor/addCourse'
import AddChapter from './component/Instructor/addChapter'
import CourseList from './component/Instructor/courseList'
import CourseByCID from './component/CourseByCatID/CourseByCatID'
import ExploreCourse from './component/CourseByCatID/ExploreCourse'
import Cart from './component/Cart/cart'
import BoughtCourse from './component/BoughtCourse/boughtCourse'
import SearchDisplay from "./component/Search/SearchDisplay";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <CRoute path="/" exact component={HomePage} />
          <CRoute path="/myCourse" exact component={MyCourse} />
          <CRoute path="/addCourse/:courseId?" exact component={AddCourse} />
          <CRoute path="/addChapter/:courseId" exact component={AddChapter} />
          <CRoute path="/courseList" exact component={CourseList} />
          <CRoute path="/courseCID" exact component={CourseByCID} />
          <CRoute path="/exploreCourse/:courseId" exact component={ExploreCourse} />
          <CRoute path="/cart" exact component={Cart} />
          <CRoute path="/boughtCourse" exact component={BoughtCourse} />
          <CRoute path="/searchData/:courseId" exact component={SearchDisplay} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
