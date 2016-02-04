var React = require('react');

export default class Controls extends React.Component {

    render() {

        let meetups = this.props.meetups.map((meetup) => <option key={meetup.id} value={meetup.id}>{meetup.name}</option>);

        return(
            <div className='photo-controls'>

                <div>
                    <label>Meetup ID:</label>
                    <select onChange={this.onChangeMeetup.bind(this)}>
                        {meetups}
                    </select>
                </div>

            </div>
        )
    }

    onChangeMeetup(e) {
        this.props.getSelectedItem(e.target.value);
    }

}