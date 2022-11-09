import {
    Backdrop,
    Fade,
    IconButton,
    Modal,
    Box,
    TextField,
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import taskApi from "../../api/taskApi";
import FileBase64 from "react-filebase64";
import {saveAs} from "file-saver";
import "../../css/style.css";
import "../../css/TaskModal.css";

const modalStyle = {
    outline: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
    p: 1,
    height: "80%",
};

let timer;
const timeout = 500;
let isModalClosed = false;

const TaskModal = (props) => {
    const boardId = props.boardId;
    const [task, setTask] = useState(props.task);
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState();
    const [client, setClient] = useState("");
    const [quickly, setQuickly] = useState(false);
    const [name, setName] = useState("");
    const [mark, setMark] = useState("");
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [count, setCount] = useState(0);
    const [plan, setPlan] = useState("");
    const [planName, setPlanName] = useState("");
    const [currentDate, setCurrentDate] = useState(0)
    const editorWrapperRef = useRef();

    useEffect(() => {
        setTask(props.task);
        setAuthor(props.task !== undefined ? props.task.author : "");
        setDate(props.task !== undefined ? props.task.date : "");
        setClient(props.task !== undefined ? props.task.client : "");
        setQuickly(props.task !== undefined ? props.task.quickly : "");
        setName(props.task !== undefined ? props.task.name : "");
        setMark(props.task !== undefined ? props.task.mark : "");
        setWidth(props.task !== undefined ? props.task.width : "");
        setHeight(props.task !== undefined ? props.task.height : "");
        setCount(props.task !== undefined ? props.task.count : "");
        setPlan(props.task !== undefined ? props.task.plan : "");
        setPlanName(props.task !== undefined ? props.task.planName : "");

        if (props.task !== undefined) {
            isModalClosed = false;

            updateEditorHeight();
        }
    }, [props.task]);

    const updateEditorHeight = () => {
        setTimeout(() => {
            if (editorWrapperRef.current) {
                const box = editorWrapperRef.current;
                box.querySelector(".ck-editor__editable_inline").style.height =
                    box.offsetHeight - 50 + "px";
            }
        }, timeout);
    };



    const deleteTask = async () => {
        try {
            await taskApi.delete(boardId, task.id);
            props.onDelete(task);
            setTask(undefined);
        } catch (err) {
            alert(err);
        }
    };
    const updateAuthor = async (e) => {
        clearTimeout(timer);
        const newAuthor = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {author: newAuthor});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.author = newAuthor;
        setAuthor(newAuthor);
        props.onUpdate(task);
    };


const updateClient = async (e) => {
    clearTimeout(timer);
    const newClient = e.target.value;
    timer = setTimeout(async () => {
        try {
            await taskApi.update(boardId, task.id, {client: newClient});
        } catch (err) {
            alert(err);
        }
    }, timeout);

    task.client = newClient;
    setClient(newClient);
    props.onUpdate(task);
};

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

const updatePlan = async (base64) => {
    clearTimeout(timer);
    // const newPlan = e.target.value
    timer = setTimeout(async () => {
        try {
            await taskApi.update(boardId, task.id, {
                plan: base64.base64,
                planName: base64.name,
            });
        } catch (err) {
            alert(err);
        }
    }, timeout);

    task.plan = base64.base64;
    task.planName = base64.name;
    setPlan(base64.base64);
    setPlanName(base64.name);
    props.onUpdate(base64.base64);
    console.log(base64);
    console.log(task.plan);
};

const downloadBase64Data = () => {
    saveAs(task.plan);
    console.log(task.plan);
};

const updateQiuckly = async (e) => {
    let isChecked = window.document.body.getElementsByTagName("chechnya");
    let isCheckedTrue = document.getElementById("one").checked;

    timer = setTimeout(async () => {
        try {
            if (isCheckedTrue === true) {
                await taskApi.update(boardId, task.id, {quickly: isCheckedTrue});
                //document.querySelector('.board-section').style.background = "red"

            } else if (isCheckedTrue === false) {
                await taskApi.update(boardId, task.id, {quickly: isCheckedTrue});
                //document.querySelector('.board-section').style.background = "#B6B2B2"
            }
            // for(let i = 0; i<isChecked.length;i++){
            //     if (isChecked[i].checked == true){
            //         document.querySelector('.board-section').style.background = "red"
            //         //console.log(isChecked[i].checked)
            //     }
            //     else if(isChecked[i].checked == false){
            //         document.querySelector('.board-section').style.background = "#B6B2B2"
            //     }
            //     console.log(isChecked[i].type=="checkbox")
            //     //if (isChecked[i].type=="checkbox")
            // }
            //console.log(isChecked.length)

        } catch (err) {
            alert(err);
        }
    }, timeout);
    task.quickly = isCheckedTrue;
    setQuickly(isCheckedTrue);
    props.onUpdate(task);

    // clearTimeout(timer)
    // const newQuickly = e.target.value
    // timer = setTimeout(async () => {
    //     try {
    //         await taskApi.update(boardId, task.id, {plan: newQuickly})
    //     } catch (err) {
    //         alert(err)
    //     }
    // }, timeout)
    //
};


let currentTime = new Date().toLocaleString("ru-RU",)
let lastDate = setInterval(
    function () {
        let newDate = new Date().toLocaleString("ru-RU",)
        setCurrentDate(newDate)
    }, 1000);
    clearInterval(lastDate)


const updateDate = async (e) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
        try {
            await taskApi.update(boardId, task.id, {date: currentTime});
        } catch (err) {
            alert(err);
        }
    }, timeout);

    task.date = currentTime;
    setDate(currentTime);
    props.onUpdate(currentTime);
};
let newDate = currentTime
	const onClose = () => {
		isModalClosed = true;
		props.onUpdate(task);
		props.onClose();
	};
const onSave = () => {
    isModalClosed = true;
    props.onUpdate(task);
    props.onClose();
    timer = setTimeout(async () => {
        try {
            await taskApi.update(boardId, task.id, {date: currentTime});
        } catch (err) {
            alert(err);
        }
    }, timeout);

    task.date = currentTime;
    setDate(currentTime);
    props.onUpdate(currentTime);
}
	// clearInterval(lastDate)
    return (
        <Modal
            open={task !== undefined}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500}}
        >
            <Fade in={task !== undefined}>
                <Box sx={modalStyle} className="board-item">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            width: "100%",
                        }}
                    >
                        <IconButton variant="outlined" color="error" onClick={onClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    <div className="fields">
                        <div className="field">
                            <div className="field_item">
                                <p>Менеджер</p>
                            </div>
                            <div className="field_item otstup">
                                <input
                                    className="color"
                                    value={author}
                                    onClick={updateAuthor}
                                    placeholder="Автор"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="field_item otstup">
                                <p>Создан</p>
                            </div>
                            <div className="field_item otstup">
                                <input
                                    className="color"
                                    value={currentTime}
                                    onChange={updateDate}
                                    placeholder="Дата создания"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="fields">
                        <div className="field">
                            <div className="field_item">
                                <p>Клиент</p>
                            </div>
                            <div className="field_item otstup_1">
                                <input
                                    className="color"
                                    value={client}
                                    onChange={updateClient}
                                    placeholder="Клиент"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="chekBox">
                                <div className="field_item">
                                    <label className="labelCh">СРОЧНО</label>
                                </div>
                                <div className="field_item">
                                    <input
                                        type="checkbox"
                                        id="one"
                                        className="chechnya"
                                        onChange={updateQiuckly}
                                        placeholder="Срочно"
                                        value={quickly}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mainfield">
                        <div className="fields">
                            <div className="field_list otstup">
                                <div className="item">
                                    <p>Наименование</p>
                                </div>
                            </div>
                            <div className="field_list otstup">
                                <div className="item otstup_2">
                                    <p>Марка</p>
                                </div>

                                <div className="field_list otstup">
                                    <div className="item">
                                        <p>Шир</p>
                                    </div>
                                </div>
                                <div className="field_list otstup">
                                    <div className="item">
                                        <p>Длина</p>
                                    </div>
                                </div>
                                <div className="field_list otstup">
                                    <div className="item">
                                        <p>Кол-во</p>
                                    </div>
                                </div>

                                <div className="field_list otstup">
                                    <div className="item">
                                        <p>
                                            <a>Файл</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="field_list otstup">
                                    <div className="item">
                                        <FileBase64 multiple={false} onDone={updatePlan}/>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    </div>

                    {/*<TextField*/}
                    {/*    value={plan}*/}
                    {/*    onChange={updatePlan}*/}
                    {/*    placeholder='Чертёж'*/}
                    {/*/>*/}

                    <div className="buttons-icons">
                        <div className="buttons-bottom">
                            <div className="delete-btn">
                                <IconButton
                                    variant="outlined"
                                    color="error"
                                    onClick={deleteTask}
                                >
                                    Удалить
                                    <DeleteOutlinedIcon/>
                                </IconButton>
                            </div>

                            <div className="save-btn">
                                <IconButton variant="outlined" color="error" onClick={onSave}>
                                    Сохранить
                                    <SaveAsIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

export default TaskModal;
