import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button
} from "shards-react";

const date = new Date().getDate(); //Current Date
const month = new Date().getMonth() + 1; //Current Month
const year = new Date().getFullYear(); //Current Year
const hours = new Date().getHours(); //Current Hours
const min = new Date().getMinutes(); //Current Minutes

class ProfileDisp extends Component {
    render() {
    return (
        <Card style={{ maxWidth: "800px" }}>
        <CardHeader>Profile</CardHeader>
        {/* <CardImg src="https://place-hold.it/300x200" /> */}
        <CardBody>
            <CardTitle>Name</CardTitle>
            <p>default</p>
            <Button>Edit your profile &rarr;</Button>
        </CardBody>
        <CardFooter>Date: {date}/{month}/{year}</CardFooter>
        </Card>
  );}
}

export default ProfileDisp;