import React from 'react';

import {Events} from '../../api/events.js';

export default class MosqueEventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOneTime: true,
            eventType: "talk",
            needParticipants: true,
            needVolunteers: true,
            gender: "all"
        };
    }
    componentDidMount() {
        document.title = "Muslim Events | Add New Event"
      //  var date = $('#datepicker').datepicker({ dateFormat: 'dd-mm-yy' }).val();
        //load jQuery for datePicker
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
            format: 'dd-mm-yyyy'
        });

        //load jQuery for material_select
        $('select').material_select();
    }

    handleNeedParticipants() {

        this.setState({
            needParticipants: !this.state.needParticipants
        });
    }
    handleNeedVolunteers() {

        this.setState({
            needVolunteers: !this.state.needVolunteers
        });
    }

    handleEventType(){
      this.setState({
          eventType: this.refs.type.value.trim()
      });
    }
    handleRecurring(){
      this.setState({
          isOneTime: !this.state.isOneTime
      });
    }

    handleSubmit(e) {
      e.preventDefault()

      /* what */
      var name = this.refs.name.value.trim();
      var eventType = this.refs.type.value.trim();
      var description = this.refs.description.value.trim();

      try {
        var speaker = this.refs.speaker.value.trim();

      } catch (err) {
        var speaker = "";
      }

      /* when */
      var dateStart = this.refs.dateStart.value.trim();
      var timeStart = this.refs.start.value.trim();
      var dateEnd = this.refs.dateEnd.value.trim();
      var timeEnd = this.refs.end.value.trim();

      var venue = this.refs.venue.value.trim();
      var address = this.refs.address.value.trim();

      var fee = this.refs.fee.value;
      var tags = this.refs.tags.value;

      var objAll = {name, speaker, eventType, description, dateStart, timeStart, dateEnd, timeEnd,
      venue, address, fee, tags}

      //console.log(objAll)

      console.log(dateStart)

      Meteor.call('addEvents', name, eventType, description, speaker, dateStart, timeStart, dateEnd, timeEnd, venue, address, fee,
    tags, (error,data) => {
            if(error){
                Bert.alert(error.error, 'danger', 'fixed-top', 'fa-frown-o');
            } else {
                Materialize.toast('Event Added Successfully!', 4000)
                FlowRouter.go("/eventsView")

            }
        })
    }

    render() {

      var type = this.state.eventType;

      if (type === "talk") {
          speaker = (
            <div className="input-field" className="col">
                <input id="speaker" type="text" className="validate" ref="speaker" placeholder="Speaker 1,Speaker 2,..."/>
                <label htmlFor="speaker" className="active">Speaker</label>
            </div>
          )

      } else {
          speaker = <span></span>
      }

        return (

                <div className="row topGap bottomGap">
                  <div className="col s12 m10 offset-m1">
                    <div className="card-panel">

                        <h3> Add Event </h3>
                        <form onSubmit={this.handleSubmit.bind(this)} className="topGap">
                            <div className="row">

                                <div className="input-field col m6">
                                    <input id="name" type="text" className="validate" ref="name"/>
                                    <label htmlFor="name" className="active">title</label>
                                </div>

                                <div className="input-field col m6">
                                  <select ref="type" className="browser-default" onChange={this.handleEventType.bind(this)}>

                                    <option value="talk">talk</option>
                                    <option value="social">social</option>
                                    <option value="community">community</option>
                                    <option value="others">others</option>
                                  </select>

                                </div>

                            </div>

                            <div className="row">
                              <div className="input-field col m6">
                                <div>{speaker}</div>
                              </div>

                            </div>

                            <div className="row">
                                <div className="input-field">
                                    <textarea id="description" className="materialize-textarea" ref="description"></textarea>
                                    <label htmlFor="description" className="active">Description</label>
                                </div>

                            </div>
                            <div className="row">
                                <div className="input-field col m3">
                                    <input type="date" className="datepicker" id="dateStart" ref="dateStart"/>
                                    <label htmlFor="dateStart">Start Date</label>
                                </div>
                                <div className="input-field col m3">
                                    <input type="time" id="start" ref="start" />
                                </div>

                                <div className="input-field col m3">
                                    <input type="date" className="datepicker" id="dateEnd" ref="dateEnd"/>
                                    <label htmlFor="dateEnd">End Date</label>
                                </div>

                                <div className="input-field col m3">
                                    <input type="time" id="end" ref="end" />
                                </div>

                            </div>

                            <div className="input-field">
                                <input id="venue" type="text" className="validate" ref="venue"/>
                                <label htmlFor="venue" className="active">Venue</label>
                            </div>

                            <div className="input-field">
                                <input id="address" type="text" className="validate" ref="address"/>

                                <label htmlFor="address" className="active">Address</label>
                            </div>

                            <div className="input-field">
                              <textarea id="direction" className="materialize-textarea" ref="direction"></textarea>
                              <label htmlFor="direction" className="active">Directions (optional)</label>
                            </div>

                            <div className="input-field">
                                <input id="fee" type="number" step="0.01" className="validate" ref="fee" defaultValue="0.00"/>
                                <label htmlFor="fee" className="active">Fee (SGD)</label>
                            </div>

                            <div className="input-field">
                                <input id="tags" type="text" className="validate" ref="tags"/>
                                <label htmlFor="tags" className="active">tags (separated by comma)</label>
                            </div>

                            <div className="topGap"></div>

                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                <i className="material-icons right">send</i>
                            </button>

                        </form>

                    </div>
                  </div>
                </div>

        )
    }
}
