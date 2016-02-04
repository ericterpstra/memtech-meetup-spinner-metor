var React = require('react');
var TweenMax = require('gsap');

export default class SpinnerItem extends React.Component {

    getStyle() {
        //'transform': `rotateY(${o}deg) translateZ(${a}px)`,
        return {
            width: this.props.lengthOfSide,
            height: this.props.lengthOfSide
        }
    }

    componentDidMount() {
        this.setRotation();
    }

    componentDidUpdate() {
        this.setRotation();
    }

    componentWillReceiveProps(nextProps) {
        //this.setRotation();
        if (this.props.index == nextProps.winner) {
            let winner = this.refs.photocontainer.getDOMNode();
            let winnerp = this.refs.photo.getDOMNode();
            TweenMax.to(winner, 1, {
                scale: '1.5',

                onComplete: function() {
                    this.reverse();
                }
            });
            TweenMax.to(winnerp,2, {
                rotationZ: '360deg'
            });
        }
    }

    render() {
        return (
            <div ref='photocontainer' className='photo' style={this.getStyle.call(this)}>
                <div ref='photo' className='photo-contain'>
                    <div className='caption'><p>{this.props.caption}</p></div>
                    <img src={this.props.src} />
                </div>
            </div>
        );
    }

    setRotation() {
        let o = this.props.angle;
        let a = this.props.inradius;
        let c = this.refs.photocontainer;

        TweenMax.set(c,{
            rotationY: `${o}deg`,
            transformOrigin: '50% 50% -' + a + 'px',
            z: `${a}px`
        });
    }
}