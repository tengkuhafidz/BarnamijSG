import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// initialise a collection here. mongo collection name should be the file name.
export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
  //declare all publish relating to the collection here
  //EXAMPLE: Tasks.find({}, { sort: { createdAt: -1 } });
  Meteor.publish('allEvents', function eventsPublication() {
    return Events.find({}); //db.events.find({}, {name: 1, dateStart: 1, timeStart: 1}).sort({dateStart: -1})
  });

}

Meteor.methods({
  //declare all methods related to the collection here
  // EXAMPLE:
  addEvents(name, eventType, description, speaker, dateStart, timeStart, dateEnd, timeEnd, venue, address, direction, fee,
tags) {
    console.log("TIMESTART FORMAT: " + timeStart)

    //dateStart
    properDateStart = dateStart;
    properDateStartFormat = dateStart.split("-");
    finalisedStart = properDateStartFormat[2] + "-" + properDateStartFormat[1] + "-" + properDateStartFormat[0] + "T" + timeStart + ":00"

    dateStart = new Date(finalisedStart)
    dateStart.setHours(dateStart.getHours() - 8)

    dateStart = dateStart.toISOString();

    //dateEnd
    properDateEnd = dateEnd;
    properFormat = dateEnd.split("-");
    finalised = properFormat[2] + "-" + properFormat[1] + "-" + properFormat[0] + "T" + timeEnd + ":00"

    dateEnd = new Date(finalised)
    dateEnd.setHours(dateEnd.getHours() - 8)

    dateEnd = dateEnd.toISOString();
    if (!tags)
      tags = ""
    else
      tags = tags.split(',');


    if (speaker !== "")
      speaker = speaker.split(',');

    if(!name || !eventType || !description || !dateStart || !timeStart || !dateEnd || !timeEnd || !venue || !address)
      throw new Meteor.Error('Some input fields are not filled in.');
    else if (dateEnd < dateStart)
      throw new Meteor.Error('Please End Date cannot be earlier than Start Date');

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.insert({
      name,
      eventType,
      description,
      speaker,
      dateStart,
      dateEnd,
      venue,
      address,
      direction,
      fee,
      tags,
      createdAt: new Date(), // current time
      adminId: Meteor.userId(),           // _id of logged in user
      mosqueName: Meteor.user().profile.name  // username of logged in user
    });
  },   //this.props.eventId, name, eventType, description, speaker, dateStart, timeStart, dateEnd, timeEnd, venue, address, direction, fee, tags
  updateEvents(eventId, name, eventType, description, speaker, dateStart, timeStart, dateEnd, timeEnd, venue, address, direction, fee, tags) {
  //dateStart
  properDateStart = dateStart;
  properDateStartFormat = dateStart.split("-");
  finalisedStart = properDateStartFormat[2] + "-" + properDateStartFormat[1] + "-" + properDateStartFormat[0] + "T" + timeStart + ":00"

  dateStart = new Date(finalisedStart)
  dateStart.setHours(dateStart.getHours() - 8)

  dateStart = dateStart.toISOString();

  //dateEnd
  properDateEnd = dateEnd;
  properFormat = dateEnd.split("-");
  finalised = properFormat[2] + "-" + properFormat[1] + "-" + properFormat[0] + "T" + timeEnd + ":00"

  dateEnd = new Date(finalised)
  dateEnd.setHours(dateEnd.getHours() - 8)

  dateEnd = dateEnd.toISOString();

  console.log("UPDATE START/END " + dateStart + "   "  + dateEnd)
  if (!tags)
    tags = ""
  else
    tags = tags.split(',');



  if (speaker !== "")
    speaker = speaker.split(',');

  if(!name || !eventType || !description || !dateStart || !timeStart || !dateEnd || !timeEnd || !venue || !address)
    throw new Meteor.Error('Some input fields are not filled in.');
  else if (dateEnd < dateStart)
    throw new Meteor.Error('Please End Date cannot be earlier than Start Date');

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.update({_id: eventId}, {
      $set: {
        name,
        eventType,
        description,
       speaker,
       dateStart,
       dateEnd,
        venue,
        address,
        direction,
       fee,
       tags,
       adminId: Meteor.userId(),
       updatedAt: new Date(), // current time
      }
    });

  },

  participateUser(eventId){
    Events.update({_id: eventId}, {
      $addToSet: {
        participants: Meteor.user().emails[0].address
      } });
  },
  cancelParticipation(eventId){
    Events.update({_id: eventId}, {
      $pull: {
        participants: Meteor.user().emails[0].address
      } });
  },
  volunteerUser(eventId){
    Events.update({_id: eventId}, {
      $addToSet: {
        volunteers: Meteor.user().emails[0].address
      } });

  },
  cancelVolunteer(eventId){
    Events.update({_id: eventId}, {
      $pull: {
        volunteers: Meteor.user().emails[0].address
      } });
  },
  removeEvent(eventId){
    Events.remove(eventId)
  },
  convertMnth(mnthString){
    //declare dictionary of month; month => numeric value

    //return the numeric value
  },
  convertDate(dateString){
    dateFinal = ""


    return dateFinal
  },
  sortDate(arrayOfDate){

  }
});
