import {useEffect, useRef, useState} from "react";
import taskApi from "../../api/taskApi";
import FileBase64 from "react-filebase64";
import {saveAs} from "file-saver";
const PlateComp = (props) => {
    const boardId = props.boardId;
    const [task, setTask] = useState(props.task);
    const [name, setName] = useState("");
    const [mark, setMark] = useState("");
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [count, setCount] = useState(0);
    const [plan, setPlan] = useState("");
    const [planName, setPlanName] = useState("");

    let isModalClosed = false;
    let timer;
    const timeout = 500;

    useEffect(() => {
        setTask(props.task);
        setName(props.task !== undefined ? props.task.name : "");
        setMark(props.task !== undefined ? props.task.mark : "");
        setWidth(props.task !== undefined ? props.task.width : "");
        setHeight(props.task !== undefined ? props.task.height : "");
        setCount(props.task !== undefined ? props.task.count : "");
        setPlan(props.task !== undefined ? props.task.plan : "");
        setPlanName(props.task !== undefined ? props.task.planName : "");

        if (props.task !== undefined) {
            isModalClosed = false;

        }
    }, [props.task]);

    const updateName = async (e) => {
        clearTimeout(timer);
        const newName = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {name: newName});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.name = newName;
        setName(newName);
        props.onUpdate(task);
    };


    const updateMark = async (e) => {
        clearTimeout(timer);
        const newMark = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {mark: newMark});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.mark = newMark;
        setMark(newMark);
        props.onUpdate(task);
    };

    const updateWidth = async (e) => {
        clearTimeout(timer);
        const newWidth = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {width: newWidth});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.width = newWidth;
        setWidth(newWidth);
        props.onUpdate(task);
    };

    const updateHeight = async (e) => {
        clearTimeout(timer);
        const newHeight = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {height: newHeight});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.height = newHeight;
        setHeight(newHeight);
        props.onUpdate(task);
    };

    const updateCount = async (e) => {
        clearTimeout(timer);
        const newCount = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {count: newCount});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.count = newCount;
        setCount(newCount);
        props.onUpdate(task);
    };
    const downloadBase64Data = () => {
        saveAs(task.plan);
        console.log(task.plan);
    };

    return (
        <div className="fields">
            <div className="field_list otstup">
                <div className="item">
                    <input
                        className="color size_1"
                        value={name}
                        onChange={updateName}
                        placeholder="Наименование"
                    />
                </div>
                <div className="item">
                    <input
                        className="color size_2 otstup"
                        value={mark}
                        onChange={updateMark}
                        placeholder="Марка"
                    />
                </div>
                <div className="item">
                    <input
                        className="color size_2"
                        value={width}
                        onChange={updateWidth}
                        placeholder="Ширина заготовки"
                    />
                </div>
                <div className="item">
                    <input
                        className="color size_2"
                        value={height}
                        onChange={updateHeight}
                        placeholder="Длина заготовки"
                    />
                </div>
                <div className="item">
                    <input
                        className="size_2 color"
                        value={count}
                        onChange={updateCount}
                        placeholder="Кол-во"
                    />
                </div>
                <div className="item">
                    <button className="btn" onClick={downloadBase64Data}></button>
                </div>
            </div>
            <div className="item">
                <div className="field_list otstup">
                    <img src={plan} className="img-filebase"/>
                </div>
            </div>
        </div>
    )
}
export default PlateComp