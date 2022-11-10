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
    bgcolor: "#B6B2B2",
    border: "0px solid #000",
    boxShadow: 24,
    p: 1,
    height: "450px",
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
    //plate 1
    const [name, setName] = useState("");
    const [mark, setMark] = useState("");
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [count, setCount] = useState(0);
    //plate2
    const [name2, setName2] = useState("");
    const [mark2, setMark2] = useState("");
    const [width2, setWidth2] = useState(0);
    const [height2, setHeight2] = useState(0);
    const [count2, setCount2] = useState(0);
    //plate3
    const [name3, setName3] = useState("");
    const [mark3, setMark3] = useState("");
    const [width3, setWidth3] = useState(0);
    const [height3, setHeight3] = useState(0);
    const [count3, setCount3] = useState(0);
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
        //plate 1
        setName(props.task !== undefined ? props.task.name : "");
        setMark(props.task !== undefined ? props.task.mark : "");
        setWidth(props.task !== undefined ? props.task.width : "");
        setHeight(props.task !== undefined ? props.task.height : "");
        setCount(props.task !== undefined ? props.task.count : "");
        //plate 2
        setName2(props.task !== undefined ? props.task.name2 : "");
        setMark2(props.task !== undefined ? props.task.mark2 : "");
        setWidth2(props.task !== undefined ? props.task.width2 : "");
        setHeight2(props.task !== undefined ? props.task.height2 : "");
        setCount2(props.task !== undefined ? props.task.count2 : "");
        //plate 3
        setName3(props.task !== undefined ? props.task.name3 : "");
        setMark3(props.task !== undefined ? props.task.mark3 : "");
        setWidth3(props.task !== undefined ? props.task.width3 : "");
        setHeight3(props.task !== undefined ? props.task.height3 : "");
        setCount3(props.task !== undefined ? props.task.count3 : "");

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
        setTimeout(() => {
            for ( let i = 0; i < 1000; i++ ) {
                document.querySelector(".addFieldBtn").click();
            }
            for ( let i = 0; i < 1000; i++ ) {
                document.querySelector(".addBtn2").click();
            }

        },1000)
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



        // if (task.name2 != undefined) {
        //     setTimeout(() => {
        //         for ( let i = 0; i < 1000; i++ ) {
        //             document.querySelector(".addFieldBtn").click();
        //         }
        //         for ( let i = 0; i < 1000; i++ ) {
        //             document.querySelector(".addBtn2").click();
        //         }
        //
        //     },1000)
        // }
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
        let isChecked = document.getElementById("one").checked;

        timer = setTimeout(async () => {
            try {
                if (isChecked === true) {
                    await taskApi.update(boardId, task.id, {quickly: isChecked});
                    //document.getElementById('board-section').style.background = "red"
                } else if (isChecked === false) {
                    await taskApi.update(boardId, task.id, {quickly: isChecked});
                    //document.getElementById('board-section').style.background = "#B6B2B2"
                }
            } catch (err) {
                alert(err);
            }
        }, timeout);
        task.quickly = isChecked;
        setQuickly(isChecked);
        props.onUpdate(task);
    };

    let currentTime = new Date().toLocaleString("ru-RU",)
    let lastDate = setInterval(
        function () {
            let newDate = new Date().toLocaleString("ru-RU",)
            setCurrentDate(newDate)
        }, 1000);
    clearInterval(lastDate)
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
    const updateName = async (e,id) => {

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
    const updateName2 = async (e) => {
        clearTimeout(timer);
        const newName = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {name2: newName});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.name2 = newName;
        setName2(newName);
        props.onUpdate(task);
    };
    const updateName3 = async (e) => {
        clearTimeout(timer);
        const newName = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {name3: newName});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.name3 = newName;
        setName3(newName);
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
    const updateMark2 = async (e) => {
        clearTimeout(timer);
        const newMark = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {mark2: newMark});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.mark2 = newMark;
        setMark2(newMark);
        props.onUpdate(task);
    };
    const updateMark3 = async (e) => {
        clearTimeout(timer);
        const newMark = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {mark3: newMark});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.mark3 = newMark;
        setMark3(newMark);
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
    const updateWidth2 = async (e) => {
        clearTimeout(timer);
        const newWidth = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {width2: newWidth});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.width2 = newWidth;
        setWidth2(newWidth);
        props.onUpdate(task);
    };
    const updateWidth3 = async (e) => {
        clearTimeout(timer);
        const newWidth = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {width3: newWidth});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.width3 = newWidth;
        setWidth3(newWidth);
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
    const updateHeight2 = async (e) => {
        clearTimeout(timer);
        const newHeight = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {height2: newHeight});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.height2 = newHeight;
        setHeight2(newHeight);
        props.onUpdate(task);
    };
    const updateHeight3 = async (e) => {
        clearTimeout(timer);
        const newHeight = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {height3: newHeight});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.height3 = newHeight;
        setHeight3(newHeight);
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
    const updateCount2 = async (e) => {
        clearTimeout(timer);
        const newCount = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {count2: newCount});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.count2 = newCount;
        setCount2(newCount);
        props.onUpdate(task);
    };
    const updateCount3 = async (e) => {
        clearTimeout(timer);
        const newCount = e.target.value;
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {count3: newCount});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.count3 = newCount;
        setCount3(newCount);
        props.onUpdate(task);
    };



    const displayField2 = () => {
        document.querySelector(".plate_2").style.display = "block"
        document.querySelector(".addBtn").style.display = "none"
        if (document.querySelector(".plate_2").style.display == "block") {
            document.querySelector(".addBtn2").style.display = "block"
        }
    }
    const displayField3 = () => {
        document.querySelector(".plate_3").style.display = "block"
    }
    const hideField = () => {
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {name: ""});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.name = "";
        setName("");
        props.onUpdate(task);
        document.querySelector(".plate_1").style.display = "none"
    }
    const hideField2 = () => {
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {name2: ""});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.name2 = "";
        setName2("");
        props.onUpdate(task);
        document.querySelector(".plate_2").style.display = "none"
    }
    const hideField3 = () => {
        timer = setTimeout(async () => {
            try {
                await taskApi.update(boardId, task.id, {name3: ""});
            } catch (err) {
                alert(err);
            }
        }, timeout);

        task.name3 = "";
        setName3("");
        props.onUpdate(task);
        document.querySelector(".plate_3").style.display = "none"
    }
    return (
        <Modal
            open={task !== undefined }
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
                        <IconButton variant="outlined" onClick={onClose}>
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
                                    id="author"
                                    className="color"
                                    value={author}
                                    onChange={updateAuthor}
                                    placeholder="Автор"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="field_item otstup">
                                <p>Создан</p>
                            </div>
                            <div className="field_item otstup">
                                <p className="color color_1">{currentTime}</p>
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
                                    <input
                                        type="checkbox"
                                        id="one"
                                        onChange={updateQiuckly}
                                        placeholder="Срочно"
                                        value={quickly}
                                    />
                                </div>
                                <div className="field_item">
                                    <label className="labelCh">Срочно</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mainfield">
                        <button className="addBtn addFieldBtn" onClick={displayField2}>Добавить поле</button>
                        <button className="addBtn2 addFieldBtn" onClick={displayField3}>Добавить поле</button>
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
                                    <div className="item btn_up">
                                        <FileBase64 multiple={false} onDone={updatePlan}/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/*1 plate*/}
                        <div className="fields plate_1">
                            <div className="field_list otstup">
                                <div className="item">
                                    <input className="color size_1" value={name} onChange={updateName}
                                           placeholder="Наименование"/>
                                </div>
                                <div className="item">
                                    <input className="color size_2 otstup" value={mark} onChange={updateMark}
                                           placeholder="Марка"/>
                                </div>
                                <div className="item">
                                    <input className="color size_2" value={width} onChange={updateWidth}
                                           placeholder="Ширина заготовки"/>
                                </div>
                                <div className="item">
                                    <input className="color size_2" value={height} onChange={updateHeight}
                                           placeholder="Длина заготовки"/>
                                </div>
                                <div className="item">
                                    <input className="size_2 color" value={count} onChange={updateCount}
                                           placeholder="Кол-во"/>
                                </div>
                                <div className="item">
                                    <button className="btn" onClick={downloadBase64Data}/>
                                </div>
                                <div className="item">
                                    <button className="btn" onClick={hideField} >X</button>
                                </div>

                            </div>

                        </div>

                        {/*2 plate*/}
                        <div className="fields plate_2">
                            <div className="field_list otstup">
                                <div className="item">
                                    <input className="color size_1" value={name2} onChange={updateName2}
                                           placeholder="Наименование"/>
                                </div>
                                <div className="item">
                                    <input className="color size_2 otstup" value={mark2} onChange={updateMark2}
                                           placeholder="Марка"/>
                                </div>
                                <div className="item">
                                    <input className="color size_2" value={width2} onChange={updateWidth2}
                                           placeholder="Ширина заготовки"/>
                                </div>
                                <div className="item">
                                    <input className="color size_2" value={height2} onChange={updateHeight2}
                                           placeholder="Длина заготовки"/>
                                </div>
                                <div className="item">
                                    <input className="size_2 color" value={count2} onChange={updateCount2}
                                           placeholder="Кол-во"/>
                                </div>
                                <div className="item">
                                    <button className="btn" onClick={downloadBase64Data}></button>
                                </div>
                                <div className="item">
                                    <button className="btn" onClick={hideField2}>X</button>
                                </div>
                            </div>
                        </div>
                        {/*3 plate*/}
                        <div className="fields plate_3">
                            <div className="field_list otstup">
                                <div className="item">
                                    <input className="color size_1" value={name3} onChange={updateName3}
                                           placeholder="Наименование"/>
                                </div>
                                <div className="item">
                                    <input className="color size_2 otstup" value={mark3} onChange={updateMark3}
                                           placeholder="Марка"/>
                                </div>
                                <div className="item">
                                    <input className="color size_2" value={width3} onChange={updateWidth3}
                                           placeholder="Ширина заготовки"/>
                                </div>
                                <div className="item">
                                    <input className="color size_2" value={height3} onChange={updateHeight3}
                                           placeholder="Длина заготовки"/>
                                </div>
                                <div className="item">
                                    <input className="size_2 color" value={count3} onChange={updateCount3}
                                           placeholder="Кол-во"/>
                                </div>
                                <div className="item">
                                    <button className="btn" onClick={downloadBase64Data}></button>
                                </div>
                                <div className="item">
                                    <button className="btn" onClick={hideField3}>X</button>
                                </div>
                            </div>


                        </div>
                        <div className="item">
                            <div className="field_list otstup">
                                <img src={plan} className="img-filebase"/>
                            </div>
                        </div>
                    </div>
                    <div className="buttons-icons">
                        <div className="buttons-bottom">
                            <div className="delete-btn">
                                <button className="btn btn_low"
                                        onClick={deleteTask}
                                >
                                    Удалить карточку
                                </button>
                            </div>

                            <div className="save-btn">
                                <button className="btn btn_low" onClick={onSave}>
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

export default TaskModal;