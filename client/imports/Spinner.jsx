import React from 'react';
import SpinnerItem from './SpinnerItem.jsx';
import TweenMax from 'gsap';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/lib/raised-button';
import Slider from 'material-ui/lib/slider';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';


const r = require('random-js')();
injectTapEventPlugin();


export default class Spinner  extends React.Component {

    constructor(props) {
        super(props);

        this.gapWidth = 10;
        this.photos = [];
        this.state = {
            numberOfSides : 1,
            inradius : 1,
            lengthOfSide : 120,
            winner : -1
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            numberOfSides : nextProps.spinnerItems.length,
            inradius: this.getInradius(this.state.lengthOfSide, nextProps.spinnerItems.length, this.gapWidth),
            winner: -1
        });
    }


    render() {
        let meetups = this.props.meetups.map((meetup) => <MenuItem key={meetup.id} value={meetup.id} primaryText={meetup.name} />);
        meetups = [<MenuItem key='0' value='' primaryText='Choose A Meetup'/>].concat(meetups) ;

        let photos = this.props.spinnerItems
            .map( (item, i) =>
                <SpinnerItem src={item.photo}
                    key={item.id}
                    index={item.id}
                    angle={item.angle}
                    numItems={this.props.spinnerItems.length}
                    inradius={this.state.inradius}
                    lengthOfSide={this.state.lengthOfSide}
                    caption={item.caption}
                    winner={this.state.winner}
                />
        );

        return (
            <div className='photospinner'>



                <div className='photo-controls'>

                    <SelectField
                        className={'meetup-select'}
                        style={{width: '100%'}}
                        value=''
                        onChange={this.onChangeMeetup.bind(this)}
                        autoWidth={true} >
                        {meetups}
                    </SelectField>

                    <RaisedButton
                        className={'spin-button'}
                        style={{width: '100%'}}
                        secondary={true}
                        label='Spin!'
                        onClick={this.onSpin.bind(this)}
                    />

                </div>

                <div className='photocontainer' style={this.getContainerStyle.call(this)}>
                    <div ref='spinner' className='photoset' style={this.getPhotosetStyle.call(this)}>
                        {photos}
                    </div>
                </div>

                <div className='photo-controls'>
                    <Slider
                        className={'size-slider'}
                        min={50}
                        max={250}
                        value={this.props.lengthOfSide}
                        onChange={this.onChangeLengthOfSide.bind(this)}
                        step={10}
                    />
                </div>

            </div>
        );

    }

    onChangeMeetup(e,i,value) {
        this.props.getSelectedItem(value);
    }

    onSpin() {

        let spinner = this.refs.spinner;
        let winnerIndex = r.integer(0, this.props.spinnerItems.length-1);
        let winnerAngle = this.props.spinnerItems[winnerIndex].angle;
        let rotation =  (720 + (360-winnerAngle)) + 'deg';


        TweenMax.set(spinner, {
            rotationY:0,
            onComplete: function() {
                TweenMax.to(spinner, 2, {
                    rotationY:rotation,
                    ease:Back.easeOut,
                    onComplete: function() {
                        this.setState({
                            winner : winnerIndex
                        })
                    }.bind(this)
                });
            }.bind(this)
        });
    }

    onChangeLengthOfSide(e, value) {
        let val = value;

        this.setState({
            winner: -1,
            lengthOfSide : val,
            inradius: this.getInradius(val, this.props.spinnerItems.length, this.gapWidth)
        })
    }

    getContainerStyle() {
        return {
            perspectiveOrigin : '50% 50%',
            perspective : (this.state.inradius * 2) + 'px'
        }
    }

    getPhotosetStyle() {
        return {
            width : this.state.lengthOfSide,
            height : this.state.lengthOfSide
        }
    }

    getInradius(len, num, gapWidth) {
        return (len / 2) * (1 / Math.tan( Math.PI / num )) + this.gapWidth;
    }

}