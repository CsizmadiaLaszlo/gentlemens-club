import topview from '../../images/top-view-small.png';

const MapsterMap = (props) => {
    return (
        <div className="d-flex">
            <img id="mapsterimage" src={topview} useMap="#testmap" />

            <map id="testmap" name="testmap">
                <area id="table-1" shape="rect" alt="" title="" coords="109,237,183,322" href="#" target="" onClick={() => {props.clickHandler(1)}}/>
                <area id="table-2" shape="rect" alt="" title="" coords="108,359,182,450" href="#" target="" onClick={() => {props.clickHandler(2)}}/>
                <area id="table-3" shape="rect" alt="" title="" coords="49,251,79,314" href="#" target="" onClick={() => {props.clickHandler(3)}}/>
                <area id="table-4" shape="rect" alt="" title="" coords="49,314,78,383" href="#" target="" onClick={() => {props.clickHandler(4)}}/>
                <area id="table-5" shape="rect" alt="" title="" coords="49,383,78,449" href="#" target="" onClick={() => {props.clickHandler(5)}}/>
                <area id="table-6" shape="rect" alt="" title="" coords="49,472,165,560" href="#" target="" onClick={() => {props.clickHandler(6)}}/>
                <area id="table-7" shape="rect" alt="" title="" coords="247,614,365,704" href="#" target="" onClick={() => {props.clickHandler(7)}}/>
                <area id="table-8" shape="rect" alt="" title="" coords="244,467,357,552" href="#" target="" onClick={() => {props.clickHandler(8)}}/>
                <area id="table-9" shape="rect" alt="" title="" coords="370,615,491,705" href="#" target="" onClick={() => {props.clickHandler(9)}}/>
                <area id="table-10" shape="rect" alt="" title="" coords="415,463,507,560" href="#" target="" onClick={() => {props.clickHandler(10)}}/>
                <area id="table-11" shape="rect" alt="" title="" coords="612,462,683,542" href="#" target="" onClick={() => {props.clickHandler(11)}}/>
                <area id="table-12" shape="rect" alt="" title="" coords="612,380,683,461" href="#" target="" onClick={() => {props.clickHandler(12)}}/>
                <area id="table-13" shape="rect" alt="" title="" coords="720,380,793,461" href="#" target="" onClick={() => {props.clickHandler(13)}}/>
                <area id="table-14" shape="rect" alt="" title="" coords="744,580,787,674" href="#" target="" onClick={() => {props.clickHandler(14)}}/>
                <area id="table-15" shape="rect" alt="" title="" coords="689,580,743,673" href="#" target="" onClick={() => {props.clickHandler(15)}}/>
                <area id="table-16" shape="rect" alt="" title="" coords="637,580,689,673" href="#" target="" onClick={() => {props.clickHandler(16)}}/>
                <area id="table-17" shape="rect" alt="" title="" coords="584,580,637,673" href="#" target="" onClick={() => {props.clickHandler(17)}}/>
                <area id="table-18" shape="rect" alt="" title="" coords="514,580,584,673" href="#" target="" onClick={() => {props.clickHandler(18)}}/>
                <area id="table-19" shape="rect" alt="" title="" coords="705,277,791,314" href="#" target="" onClick={() => {props.clickHandler(19)}}/>
                <area id="table-20" shape="rect" alt="" title="" coords="617,277,706,314" href="#" target="" onClick={() => {props.clickHandler(20)}}/>
                <area id="table-21" shape="rect" alt="" title="" coords="735,143,789,246" href="#" target="" onClick={() => {props.clickHandler(21)}}/>
                <area id="table-22" shape="rect" alt="" title="" coords="672,143,736,246" href="#" target="" onClick={() => {props.clickHandler(22)}}/>
                <area id="table-23" shape="rect" alt="" title="" coords="613,143,673,246" href="#" target="" onClick={() => {props.clickHandler(23)}}/>
                <area id="table-24" shape="rect" alt="" title="" coords="720,461,792,541" href="#" target="" onClick={() => {props.clickHandler(24)}}/>
                <area id="table-25" shape="circle" alt="" title="" coords="526,198,48" href="#" target="" onClick={() => {props.clickHandler(25)}}/>
            </map>
        </div>
    )
}

export default MapsterMap