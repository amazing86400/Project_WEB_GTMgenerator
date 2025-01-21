let inputNo = 2;  //input태그 번호
let triggerId = 70;     //트리거Id 초기 값
const editor = document.getElementById('editor');    //editor
const editor_backgroud = document.querySelector('.editor_background');  // editor_background
let tags = []; //태그 배열 선언
let eventVariables = []; //이벤트 변수 배열 선언
let triggers = []; //트리거 배열 선언
let updateTagName = ""; // 업데이트 시 현재 선택한 태그 이름 변수
let updateTriggerName = ""; // 업데이트 시 현재 선택한 트리거 이름 변수

//editor창 밖 영역(editor_background) 클릭 시 editorClose함수 호출
document.addEventListener('click', (e) => {
    e.target === editor_backgroud ? openDialog("noSave") : false;
});

//input 태그 값 변경시 deleteErrLabel함수 호출
editor.addEventListener('input', deleteErrLabel)

//excelData값으로 이벤트 매개변수 input태그 생성함수
function addEvent() {
    const eventParameter = document.getElementById('event_parameter');
    const data = document.getElementById('event_excelData').value;
    const rows = data.split('\n');
    for (i of rows) {
        inputNo += 1
        eventParameter.insertAdjacentHTML('beforeend', `<div id='test${inputNo}'><input type='text' name='ep_key' class='form_input' value='${i}'><input type='text' name="ep_value" class='form_input' value='${i}'><i class='remove_button' onclick='deleteInput(${inputNo})'></i></div>`)
    }
    document.getElementById('event_excelData').value = '';
}

//excelData값으로 사용자 속성 input태그 생성함수
function addUser() {
    const userParameter = document.getElementById('user_property')
    const data = document.getElementById('user_excelData').value;
    const rows = data.split('\n');
    for (i of rows) {
        inputNo += 1
        userParameter.insertAdjacentHTML('beforeend', `<div id='test${inputNo}'><input type='text' name="up_key" class='form_input' value='${i}'><input type='text' name="up_value" class='form_input' value='${i}'><i class='remove_button' onclick='deleteInput(${inputNo})'></i></div>`)
    }
    document.getElementById('user_excelData').value = '';
}

//행 추가 버튼 클릭 시 이벤트 매개변수 input태그 생성함수
function addEventInput() {
    const eventParameter = document.getElementById('event_parameter');
    inputNo += 1
    eventParameter.insertAdjacentHTML('beforeend', `<div id='test${inputNo}'><input type='text' name="ep_key" class='form_input'><input type='text' name="ep_value" class='form_input'><i class='remove_button' onclick='deleteInput(${inputNo})'></i></div>`)
}

//행 추가 버튼 클릭 시 사용자 속성 input태그 생성함수
function addUserInput() {
    const userParameter = document.getElementById('user_property')
    inputNo += 1
    userParameter.insertAdjacentHTML('beforeend', `<div id='test${inputNo}'><input type='text' name="up_key" class='form_input'><input type='text' name="up_value" class='form_input'><i class='remove_button' onclick='deleteInput(${inputNo})'></i></div>`)
}

//-버튼 클릭 시 해당 input태그 삭제 해주는 함수
function deleteInput(num) {
    document.getElementById('test' + num).remove();
}

// editor창 여는 함수
function editorOpen() {
    document.querySelector('.editor').insertAdjacentHTML('beforeend',
        `<div class="editor_wrapper">
        <div class="editor_title">
            <i class="editor_close" onclick="openDialog('noSave')"></i>
            <div class="tag_name">
                <input class="input_tag_name" id="tag_name" type="text" placeholder="태그이름을 입력하세요">
            </div>
            <button id="setData" class="create_button" onclick="setData()">저장</button>
        </div>
        <div class="form_card">
            <div class="content">
                <div class="tag_conf">
                    <div class="conf_title">
                        <div>태그 구성</div>
                    </div>
                    <div class="form_tagType">
                        <div class="caption">태그 유형</div>
                        <div class="radio">
                            <input class="tagType" id="conf" type="radio" name="tagType" onclick="changeTagType()" value="googtag" checked="checked">
                            <label for="conf" class="radio_label conf">
                                    <div class="radio_img">
                                        <img class="conf_img" src="assets/gaImg2.svg">
                                    </div>
                                    <div class="radio_caption">
                                        <div>Google 태그</div>
                                        <div>Google</div>
                                    </div>
                            </label>
                            <input class="tagType" id="event" type="radio" name="tagType" onclick="changeTagType()" value="gaawe">
                            <label for="event" class="radio_label">
                                <div class="radio_img">
                                    <img class="conf_img" src="assets/gaImg.svg">
                                </div>
                                <div class="radio_caption">
                                    <div>Google 애널리틱스: GA4 이벤트</div>
                                    <div>Google Marketing Platform</div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div id="form_mid">
                        <div id="change_tagType">
                            <div id="form_measurementId">
                                <div class="caption">측정 ID</div>
                                <input type="text" class="form_input" id="measurementId">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="field_title">공유된 이벤트 설정</div>
                        <div id="form_bb">
                            <label class="caption" for="bb">이벤트 설정 변수</label><br>
                            <select class="select_box" name="bb" id="eventVariable">
                                <option value="undefined">이벤트 변수 선택...</option>
                                <option disabled value="undefined">---------</option>
                                <option value="new">새 변수...</option>
                            </select>
                        </div>
                        <div class="input_area">
                            <div> 
                                <div id="event_parameter">
                                    <div class="input_title">
                                        <div class="field_name">이벤트 매개변수</div><div class="field_name">값</div>
                                    </div>
                                </div>
                                <button class="add_input" onclick="addEventInput();">매개변수 추가</button>
                            </div>
                            <div class="textarea">
                                <textarea class="textarea_box" id="event_excelData"></textarea><br><button class="add_input" type="button" onclick="addEvent()">입력</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="field_title">사용자 속성</div>
                        <div class="input_area">
                            <div>
                                <div id="user_property">
                                    <div class="input_title">
                                        <div class="field_name">속성 이름</div><div class="field_name">값</div>
                                    </div>
                                </div>
                                <button class="add_input" onclick="addUserInput();">행 추가</button>
                            </div>
                            <div class="textarea">
                                <textarea class="textarea_box" id="user_excelData"></textarea><br><button class="add_input" type="button" onclick="addUser()">입력</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="set_trigger">
                    <div class="conf_title">
                        <div>트리거</div>
                    </div>
                    <div class="form_tagType">
                        <div class="caption">트리거 유형</div>
                        <div class="radio">
                            <input class="triggerType" id="pageview" type="radio" name="triggerType" value="pageview" onclick="changeTriType()" checked="checked"><label class="radio_label">페이지뷰</label>
                            <input class="triggerType" id="event2" type="radio" name="triggerType" value="event" onclick="changeTriType()"><label class="radio_label">맞춤 이벤트</label>
                        </div>
                    </div>
                    <div class="caption">트리거 실행</div>
                    <div id="form_trigger">
                        <div id="change_trigger">
                            <div class="trigger_card">
                                <i class="pageview_icon"></i>
                                <div class="trigger_icon_caption">
                                    <div>All Pages</div>
                                    <div>페이지뷰</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    )
    editor.classList.toggle('open');
    editor_backgroud.classList.toggle('open');
    document.body.style.overflow = "hidden";

    // 이벤트 변수 변경 시 UI변경
    const eventVariable = document.getElementById('eventVariable');
    eventVariable.addEventListener('change', changeEventVariable);

    // 이벤트 변수가 이전에 설정 되어있을 때 select option에 설정된 이벤트 변수 출력
    const uniqueEventVariableNames = new Set();
    if (tags) {
        for (i of tags) {
            const eventVariableName = i.eventVariable.eventVariableName;
            if (eventVariableName && !uniqueEventVariableNames.has(eventVariableName)) {
                eventVariable.insertAdjacentHTML('beforeend',`<option value="${eventVariableName}">${eventVariableName}</option>`);
                uniqueEventVariableNames.add(eventVariableName);
            }
        }
    }
}

//editor창 닫는 함수
function editorClose() {
    editor.classList.toggle('open');
    editor_backgroud.classList.toggle('open');
    document.querySelector('.editor_wrapper').remove();
    document.body.style.overflow = "unset";
}

//태그 유형 checkbox 변경 시 화면 래이아웃 변경해주는 함수
function changeTagType() {
    const checkValue = document.querySelector('input[name="tagType"]:checked').value;
    const divChange = document.getElementById('change_tagType')
    divChange.remove();
    //구성 태그인 경우
    if (checkValue == 'googtag') {
        const configEle = document.createElement('div')
        configEle.innerHTML =
            `<div id="change_tagType">
                <div id="form_measurementId">
                    <div class="caption">측정 ID</div>
                    <input type="text" class="form_input" id="measurementId">
                </div>
            </div>`;
        document.getElementById('form_mid').append(configEle);
        document.getElementsByClassName('field_title')[0].innerHTML = '설정할 필드'
        document.getElementsByClassName('field_name')[0].innerHTML = '필드 이름'
        //이벤트 태그인 경우
    } else {
        const eventEle = document.createElement('div')
        eventEle.innerHTML =
            `<div id="change_tagType">
                <div id="form_aa">
                    <label class="caption" for="aa">Google 태그</label><br>
                    <select class="select_box" name="aa" id="aa">
                        <option value="undefined">Google 태그 선택...</option>
                        <option value="none">없음-직접 ID 설정</option>
                    </select>
                </div>
                <div id="form_measurementId"></div>
                <div id="form_eventName">
                    <div class="caption">이벤트 이름</div>
                    <input type="text" class="form_input" id="event_name">
                </div>
                <div class="caption">전자상거래</div>
                <input type="checkbox" id="isEcommerce" value="true">
                <label for="isEcommerce"><div>전자상거래 데이터 전송</div></label>
            </div>`;
        document.getElementById('form_mid').append(eventEle);
        document.getElementsByClassName('field_title')[0].innerHTML = '이벤트 매개변수'
        document.getElementsByClassName('field_name')[0].innerHTML = '매개변수 이름'
        const selectTag = document.getElementById('aa');
        if (tags) {
            for (i of tags) {
                if (i.type == 'googtag') {
                    selectTag.insertAdjacentHTML('beforeend', `<option value="${i.measurementId}">${i.tagName}</option>`)
                }
            }
        }
        //직접 입력 선택 시 측정ID입력할 수 있는 input태그 생성해주는 함수
        selectTag.addEventListener('change', changeAAInput);
    }
}

// 구글 태그가 있을 경우 해당 태그를 select option에 출력
function changeAAInput() {
    const selectTag = document.getElementById('aa');
    const selectUndefined = selectTag.options[selectTag.selectedIndex].value;
    const formMid = document.getElementById('form_measurementId');
    if (selectUndefined == 'none') {
        formMid.replaceChildren()
        formMid.insertAdjacentHTML('beforeend', `<div class="caption">측정 ID</div><input type="text" class="form_input" id="measurementId">`)
    } else {
        formMid.replaceChildren()
        formMid.insertAdjacentHTML('beforeend', `<input type="hidden" class="form_input" id="measurementId" value="${selectUndefined}">`)
    }
}

// 이벤트 변수를 새 변수로 설정 했을 때 UI 변경해주는 함수
function changeEventVariable() {
    const eventVariable = document.getElementById('eventVariable');
    const selectEventVaiable = eventVariable.options[eventVariable.selectedIndex].value;
    const formEventVariable = document.getElementById('form_bb');
    // const eventArea = document.getElementById('event_parameter');
    // const userArea = document.getElementById('user_property');
    if (selectEventVaiable == 'new') {
        formEventVariable.insertAdjacentHTML('beforeend',
        `<div id="eventVariableName">
            <div class="caption">이벤트 변수 이름</div>
            <input type="text" class="form_input" id="variableName">
        </div>`);
        addEventInput();
        addUserInput();
    } else {
        if (document.getElementById('eventVariableName')) {
            formEventVariable.lastChild.remove();
            // eventArea.innerHTML = ''
            // userArea.innerHTML = ''
        }
    }
}

//트리거 유형 checkbox 변경 시 화면 래이아웃 변경해주는 함수
function changeTriType() {
    const checkValue = document.querySelector('input[name="triggerType"]:checked').value;
    const divChange = document.getElementById('change_trigger')
    divChange.remove();
    if (checkValue == 'pageview') {
        const configEle = document.createElement('div')
        configEle.innerHTML =
            `<div id="change_trigger">
                <div class="trigger_card">
                    <i class="pageview_icon"></i>
                    <div class="trigger_icon_caption">
                        <div>All Pages</div>
                        <div>페이지뷰</div>
                    </div>
                </div>
            </div>`;
        document.getElementById('form_trigger').append(configEle);
    } else {
        const eventEle = document.createElement('div')
        eventEle.innerHTML =
            `<div id="change_trigger">
                <div class="trigger_card">
                    <i class="event_icon"></i>
                    <div class="trigger_icon_caption">
                        <div><input type="text" id="trigger_name" placeholder="트리거 이름을 입력하세요"></div>
                        <div>맞춤 이벤트</div>
                    </div>
                </div>
                <div>
                    <div class="caption">이벤트 이름</div>
                    <input type="text" id="trigger_value" class="form_input">
                </div>
                <div class="last_div"></div>
            </div>`;
        document.getElementById('form_trigger').append(eventEle);
    }
}

//저장 버튼 클릭 시 데이터 설정해주는 함수
function setData() {
    if (validation()) {
        const ep_key = document.getElementsByName('ep_key');
        const ep_value = document.getElementsByName('ep_value');
        const up_key = document.getElementsByName('up_key');
        const up_value = document.getElementsByName('up_value');
        const eventArr = [];
        const userArr = [];
        isEcommerce = document.getElementById('isEcommerce') ? document.getElementById('isEcommerce').checked : false;

        //이벤트 매개변수 값 설정
        for (let i = 0; i < ep_key.length; i++) {
            if (!(ep_key[i].value == '##ecommerce' || ep_key[i].value == true)) {
                eventArr.push({
                    name: ep_key[i].value.trim(),
                    variable: ep_value[i].value.trim()
                });
            } else {
                isEcommerce = true;
            }
        }

        //사용자 속성 매개변수 설정
        for (let i = 0; i < up_key.length; i++) {
            userArr.push({
                name: up_key[i].value.trim(),
                variable: up_value[i].value.trim()
            });
        }

        //이벤트 변수 설정
        let eventVariable;
        // 새로 만들 경우
        if (document.getElementById('eventVariable').value == 'new') {
            eventVariable = {
                eventVariableName: document.getElementById('variableName').value,
                eventSetting: eventArr,
                userSetting: userArr
            }
            eventVariables.push(eventVariable);
        // 기존 이벤트 변수를 사용할 경우
        } else {
            if (document.getElementById('eventVariable').value) {
                for (i of eventVariables) {
                    if (document.getElementById('eventVariable').value == i.eventVariableName) {
                        eventVariable = i
                    }
                }
            }

        }

        //태그 설정
        const tagType = document.querySelector('input[name="tagType"]:checked').value;
        let setTag = {
            tagName: document.getElementById('tag_name').value,
            type: document.querySelector('input[name="tagType"]:checked').value,
            measurementId: document.getElementById('measurementId').value,
            triggerType: document.querySelector('input[name="triggerType"]:checked').value,
            triggerId: triggerId,
            eventVariable,
            dimensions: document.getElementById('eventVariable').value == 'new' ? [] : eventArr,
            userProperties: document.getElementById('eventVariable').value == 'new' ? [] : userArr,
            isEcommerce: isEcommerce
        };

        //이벤트 태그 일 경우
        if (tagType == 'gaawe') {
            const eventName = document.getElementById('event_name').value;
            setTag.eventName = eventName;
        }
        tags.push(setTag);

        //트리거 설정
        const triggerType = document.querySelector('input[name="triggerType"]:checked').value;
        if (triggerType == 'event') {
            let setTrigger = {
                name: document.getElementById('trigger_name').value,
                variable: document.getElementById('trigger_value').value,
                triggerId: setTag.triggerId
            }
            triggers.push(setTrigger);
            ++triggerId
        }

        document.querySelector('.export_data').style.display = 'block';
        //설정 완료 되면 setDataList함수 호출
        setDataList();
    }
}

//태그 생성하면 메인 화면에 리스트로 출력해주는 함수
function setDataList() {
    const div_empty_table = document.getElementById("empty_table");
    if (window.getComputedStyle(div_empty_table).display == "block") {
        div_empty_table.style.display = "none";
        const tableEle = document.createElement("table");
        tableEle.innerHTML = `<table>
                  <thead>
                      <tr>
                          <th><i class="table_check_box" onclick="selectChkAll();"></i></th>
                          <th>이름</th>
                          <th>유형</th>
                          <th>트리거 실행</th>
                      </tr>
                  </thead>
                  <tbody id='tbody'>
                  </tbody>
              </table>`;
        document.querySelector(".table").append(tableEle);
    }

    // tbody 영역 제거
    const tbodyElement = document.getElementById("tbody");
    const trElement = document.getElementById("tr");
    if (trElement) {
        tbodyElement.replaceChildren();
    }

    // 태그 생성
    tags.forEach((e) => {
        const tagName = e.tagName;
        const tagType = e.type == "googtag" ? "Google 태그" : "Google 애널리틱스: GA4 이벤트";
        const tagTri = e.triggerType == "pageview" ? "All Pages" : ttt();
        function ttt() {
            for (i in triggers) {
                if (e.triggerId == triggers[i].triggerId) {
                    return triggers[i].name;
                }
            }
        }
        const iconClass = e.triggerType == "pageview" ? "list_icon pageview" : "list_icon event";
        const tbody = document.getElementById("tbody");
        tbody.insertAdjacentHTML("beforeend",
            `<tr id="tr">
                <td>
                    <i class="check_box_icon" onclick="selectChkBox(event);"></i>
                </td>
                <td onclick="viewTag(this)">${tagName}</td>
                <td>${tagType}</td>
                <td>
                    <div class="list_trigger"><i class="${iconClass}"></i>${tagTri}</div>
                </td>
            </tr>`
        );
    });

    //리스트로 저장 되면 resetEditor함수 호출
    editorClose();
}

//체크박스가 토글 됐을 때 버튼 변경해주는 함수
function toggleCreateButton() {
    const createButton = document.querySelector('.create_button');
    const delete_button = document.querySelector('.delete_button');
    const selectedChkBoxes = document.getElementsByClassName('checked')[0];
    const tableCheckBox = document.querySelector('.table_check_box');
    createButton.style.display = selectedChkBoxes ? 'none' : 'block';
    delete_button.style.display = selectedChkBoxes ? 'block' : 'none';
    tableCheckBox.classList.toggle('checkedAll', selectedChkBoxes);
}

//체크 박스 개별 선택 시 토글해주는 함수
function selectChkBox(e) {
    e.target.classList.toggle('checked');
    toggleCreateButton();
}

//체크 박스 전체 체크 되어있는지 확인해주는 함수
function isSelectChkAll() {
    const checkBox = document.querySelectorAll('.check_box_icon');
    for (i of checkBox) {
        if (!i.classList.contains('checked')) {
            return false;
        }
    }
    return true;
}

//체크 박스 전체 체크 해주는 함수
function selectChkAll() {
    const checkBox = document.querySelectorAll('.check_box_icon');
    if (isSelectChkAll()) {
        checkBox.forEach((e) => {
            e.classList.toggle('checked');
        });
    } else {
        checkBox.forEach((e) => {
            if (!e.classList.contains('checked')) {
                e.classList.add('checked');
            }
        });
    }
    toggleCreateButton();
}

//선택된 태그 삭제해주는 함수
function deleteTag() {
    var checked = document.getElementsByClassName('checked');
    Array.from(checked).forEach((checkbox) => {
        var tagName = checkbox.parentElement.nextElementSibling.innerText;
        var triggerName = checkbox.parentElement.parentElement.lastElementChild.innerText;

        tags = tags.filter((e) => {
            return e.tagName !== tagName;
        });
        triggers = triggers.filter((e) => {
            return e.name !== triggerName;
        })
        checkbox.parentElement.parentElement.remove();
    });
    if (tags.length == 0) {
        document.getElementById('empty_table').style.display = 'block';
        document.querySelector(".table").children[0].remove();
        document.querySelector('.create_button').style.display = 'block';
        document.querySelector('.delete_button').style.display = 'none';
    }
}

// 리스트에서 태그 클릭 했을 때 해당 태그 정보를 폼에 설정해주는 함수
function viewTag(e) {
    for (q of tags) {
        if (e.innerText === q.tagName) {
            updateTagName = e.innerText; // 현재 선택한 태그 이름 설정
            updateTriggerName = e.parentElement.children[3].innerText; // 현재 선택한 트리거 이름 설정
            editorOpen();
            //여기다가 input값 설정
            // document.getElementsByClassName("input_title")[0].nextElementSibling.remove();
            // document.getElementsByClassName("input_title")[1].nextElementSibling.remove();

            //태그 이름 설정
            document.getElementById("tag_name").value = q.tagName;
            //태그 타입 설정
            if (q.type == "googtag") {
                document.getElementById("conf").checked = true;
                changeTagType();
                //측정 ID설정
                document.getElementById("measurementId").value = q.measurementId;
            } else {
                document.getElementById("event").checked = true;
                changeTagType();
                //이벤트 태그일 때 이벤트 이름 설정
                document.getElementById("event_name").value = i.eventName;
                //측정 ID설정
                const select = document.getElementById("aa");
                if (q.measurementId.includes("G-")) {
                    select.options[1].selected = true;
                    changeAAInput();
                    document.getElementById("measurementId").value = q.measurementId;
                } else {
                    for (j of select.options) {
                        if (j.value == q.measurementId) {
                            j.selected = true;
                            changeAAInput();
                        }
                    }
                }

                // 전자상거래 전송 체크
                if (q.isEcommerce) {
                    document.getElementById('isEcommerce').checked = true;
                }
            }

            // 이벤트 변수 설정
            if (q.eventVariable.eventVariableName) {
                const eventVariable = document.getElementById("eventVariable");
                for (j of eventVariable.options) {
                    if (j.value == q.eventVariable.eventVariableName) {
                        j.selected = true;
                        changeEventVariable();
                    }
                }
            }

            //트리거 설정
            if (q.triggerType == "event") {
                document.getElementById("event2").checked = true;
                changeTriType();
                for (j of triggers) {
                    if (q.triggerId == j.triggerId) {
                        document.getElementById("trigger_name").value = j.name;
                        document.getElementById("trigger_value").value = j.variable;
                    }
                }
            }

            //매개변수 설정
            // for (j of q.VAR_Array) {
            //     const eventParameter = document.getElementById("event_parameter");
            //     inputNo += 1;
            //     eventParameter.insertAdjacentHTML("beforeend", `<div id='test${inputNo}'><input type='text' name="ep_key" class='form_input' value="${j.name}"><input type='text' name="ep_value" class='form_input' value="${j.variable}"><i class='remove_button' onclick='deleteInput(${inputNo})'></i></div>`);
            // }
            // for (z of q.user_Array) {
            //     const userParameter = document.getElementById("user_property");
            //     inputNo += 1;
            //     userParameter.insertAdjacentHTML("beforeend", `<div id='test${inputNo}'><input type='text' name="up_key" class='form_input' value="${z.name}"><input type='text' name="up_value" class='form_input' value="${z.variable}"><i class='remove_button' onclick='deleteInput(${inputNo})'></i></div>`);
            // }
            //button class명 추가
            document.getElementById("setData").setAttribute("onclick", "updateTag('"+ e.innerText +"')");
        }
    }
}

//버튼 class명 눌렀을 때 업데이트 해주는 함수
function updateTag(tagName) {
    if (validation('update')) {
        const ep_key = document.getElementsByName('ep_key');
        const ep_value = document.getElementsByName('ep_value');
        const up_key = document.getElementsByName('up_key');
        const up_value = document.getElementsByName('up_value');
        const eventArr = [];
        const userArr = [];
        isEcommerce = false;
        let setTrigger = new Object();

        //이벤트 매개변수 값 설정
        for (let i = 0; i < ep_key.length; i++) {
            if (!(ep_key[i].value == '##ecommerce' || ep_key[i].value == true)) {
                eventArr.push({
                    name: ep_key[i].value.trim(),
                    variable: ep_value[i].value.trim()
                });
            } else {
                isEcommerce = true;
            }
        }

        //사용자 속성 매개변수 설정
        for (let i = 0; i < up_key.length; i++) {
            userArr.push({
                name: up_key[i].value.trim(),
                variable: up_value[i].value.trim()
            });
        }

        //태그 설정
        const tagType = document.querySelector('input[name="tagType"]:checked').value;

        let setTag = {
            tagName: document.getElementById('tag_name').value,
            type: document.querySelector('input[name="tagType"]:checked').value,
            measurementId: document.getElementById('measurementId').value,
            triggerType: document.querySelector('input[name="triggerType"]:checked').value,
            triggerId: triggerId,
            VAR_Array: eventArr,
            user_Array: userArr,
            isEcommerce: isEcommerce
        };

        //이벤트 태그 일 경우
        if (tagType == 'gaawe') {
            const eventName = document.getElementById('event_name').value;
            setTag.eventName = eventName;
        }

        //트리거 설정
        const triggerType = document.querySelector('input[name="triggerType"]:checked').value;
        if (triggerType == 'event') {
            setTrigger = {
                name: document.getElementById('trigger_name').value,
                variable: document.getElementById('trigger_value').value,
                triggerId: setTag.triggerId
            }
        }
        ++triggerId

        //트리거 적용
        for (i in tags) {
            if (tags[i].tagName == tagName) {
                // 기존 트리거가 pageview일때
                if (tags[i].triggerType == 'pageview') {
                    // Pageview >> 맞춤 트리거
                    if (!Object.keys(setTrigger).length == 0) {
                        triggers.push(setTrigger)
                    }
                // 트리거가 맞춤 트리거 일때
                } else {
                    for (j in triggers) {
                        // 맞춤 트리거 >> 맞춤 트리거
                        if (!Object.keys(setTrigger).length == 0) {
                            if (tags[i].triggerId == triggers[j].triggerId) {
                                triggers[j] = setTrigger
                            }
                        // 맞춤 트리거 >> pageview
                        } else {
                            triggers.splice(j,1)
                        }
                    }
                }
                tags[i] = setTag;
            }
        }
        document.querySelector('.export_data').style.display = 'block';
        //설정 완료 되면 setDataList함수 호출
        setDataList();
    }
}

//예외처리해주는 함수
function validation(type) {
    let returnVal = true;

    //태그 이름이 없는 경우
    const tagName = document.getElementById('tag_name');
    if (!tagName.value) {
        openDialog("noValue", "태그 이름");
        return false;
    }
    if (type != 'update') {
        for (i of tags) {
            if (i.tagName == tagName.value) {
                openDialog("dupValue", "태그");
                return false;
            }
        }
    } else {
        if (updateTagName != tagName.value) {
            for (i of tags) {
                if (i.tagName == tagName.value) {
                    openDialog("dupValue", "태그");
                    return false;
                }
            }
        }
    }
    //태그 이름이 중복인 경우
    const triggerName = document.getElementById('trigger_name')
    if (triggerName) {
        //맞춤 트리거 이름이 없는 경우
        if (!triggerName.value) {
            openDialog("noValue", "트리거 이름");
            return false;
        }
        //맞춤 트리거 중복인 경우
        if (type != 'update') {
            for (i of triggers) {
                if (i.name == triggerName.value) {
                    openDialog("dupValue", "트리거");
                    return false;
                }
            }
        } else {
            if (updateTriggerName != triggerName.value && updateTriggerName != "All Pages") {
                for (i of triggers) {
                    if (i.name == triggerName.value) {
                        openDialog("dupValue", "트리거");
                        return false;
                    }
                }
            }
        }
    }

    //cid가 중복인 경우

    //input태그에 값 없는 경우
    document.querySelectorAll('.form_input').forEach((e) => {
        const checkValue = document.querySelector('input[name="tagType"]:checked').value;
        if (!e.value) {
            errorLabel('noInput', e);
            returnVal = false;
        }
        if (checkValue == 'googtag' && e.value == '##ecommerce') {
            errorLabel('noEco', e);
            returnVal = false;
        }
    })
    //이벤트 태그에서 구성태그 선택안한 경우
    const aaEle = document.getElementById('aa');
    if (aaEle && aaEle.value === 'undefined') {
        errorLabel('noSelectTag');
        return false;
    }
    //측정ID 유효성 검사 일치하지 않는 경우
    const measurementId = document.getElementById('measurementId');
    if (measurementId && (!aaEle || aaEle.value === 'none')) {
        const regex = /^G-[A-Za-z0-9]{4,}$/;
        if (!regex.test(measurementId.value)) {
            errorLabel('noRegex');
            return false;
        }
    }

    return returnVal;
}

//예외처리 함수에서 dialog 여는 함수(파라미터 값으로 dialog title, content값 변경)
function openDialog(errorType, value) {
    let errorMsg = {};
    switch (errorType) {
        case 'noSave':
            errorMsg = {
                title: '저장되지 않은 변경사항',
                content: '이 페이지를 닫으시겠습니까? 변경사항을 저장하지 않았습니다. 페이지를 닫으면 변경사항이 손실됩니다.'
            };
            break;
        case 'noValue':
            errorMsg = {
                title: '입력되지 않은 값이 있음',
                content: '이 태그에 ' + value + ' 값이 없습니다. 해당 값을 입력하지 않으면 태그를 저장할 수 없습니다.'
            };
            break;
        case 'dupValue':
            errorMsg = {
                title: '중복된 값이 있음',
                content: '컨테이너에 같은 이름의 ' + value + '가 이미 있습니다. 다른 ' + value + ' 이름을 선택하세요.'
            };
            break;
    }
    document.getElementById('dialog_header').innerHTML = errorMsg.title;
    document.getElementById('p').innerHTML = errorMsg.content;
    document.getElementById('dialog_wrapper').classList.toggle('opening');
    document.getElementById('dialog_background').classList.toggle('opening');
}

//예외처리 함수에서 에러문구 생성해주는 함수
function errorLabel(type, e) {
    switch (type) {
        case 'noInput':
            if (e.parentElement.lastChild.className != 'errorLabel') {
                e.parentElement.insertAdjacentHTML('beforeend', `<div class="errorLabel">값을 입력해야 합니다.</div>`)
            }
            break;
        case 'noSelectTag':
            const tagType = document.getElementById('form_aa');
            if (tagType && tagType.lastChild.className != 'errorLabel') {
                tagType.insertAdjacentHTML('beforeend', `<div class="errorLabel">값을 입력해야 합니다.</div>`)
            };
            break;
        case 'noRegex':
            const measurementId = document.getElementById('measurementId')
            if (measurementId && measurementId.parentElement.lastChild.className != 'errorLabel') {
                document.getElementById('form_measurementId').insertAdjacentHTML('beforeend', `<div class="errorLabel">올바른 측정 ID를 입력하세요(예: G-1234)</div>`)
            };
            break;
        case 'noEco':
            if (e.parentElement.lastChild.className != 'errorLabel') {
                e.parentElement.insertAdjacentHTML('beforeend', `<div class="errorLabel">Google 태그에는 전자상거래 설정이 불가합니다.</div>`)
            }
            break;
    }
}

//input태그 값 변경시 에러문구 있을 때 에러문구 삭제해주는 함수
function deleteErrLabel(e) {
    if (e.target.tagName == 'INPUT' || e.target.tagName == 'SELECT') {
        if (e.target.parentElement.lastChild.className == 'errorLabel') {
            e.target.parentElement.lastChild.remove()
        }
    }
}

//dialog창에서 변경사항 삭제 클릭 시 editor창 초기화 해주는 함수
function reset() {
    document.getElementById('dialog_wrapper').classList.toggle('opening');
    document.getElementById('dialog_background').classList.toggle('opening');
    editorClose();
}

// 페이지 새로고침시 alert창 출력해주는 함수
// window.onbeforeunload = function (e) {
//     let dialogText = 'Dialog text here';
//     e.returnValue = dialogText;
//     return dialogText;
// };

// 최종적으로 변수 설정해주는 함수
function setVariables(tags) {
    const regex = /{{|}}/g;
    let set = new Set();

    tags.forEach((obj) => {
        if (obj.dimensions) {
            obj.dimensions.forEach((ele) => {
                set.add(ele.variable);
            });
        }

        if (obj.userProperties) {
            obj.userProperties.forEach((ele) => {
                set.add(ele.variable);
            });
        }

        if (regex.test(obj.eventName)) {
            let replaceEle = obj.eventName.replace(regex, '');
            set.add(replaceEle);
        }
    });
    let variables = [...set];

    return variables;
}

// (new)이벤트 변수의 변수 설정해주는 함수
function setEventVariables(eventVariables) {
    let set = new Set();

    for (i of eventVariables) {
        for(j of i.eventSetting) {
            set.add(j.variable);
        }
        for(j of i.userSetting) {
            set.add(j.variable);
        }
    }
    return [...set];
}

function setTriggers(triggers) {
    const set = new Set(triggers);
    const trigger = [...set];

    return trigger;
}

//내보내기 클릭했을 때 json파일 함수 호출
function setJson() {
    let Eventvariables = setEventVariables(eventVariables);
    let variables = setVariables(tags);
    let fullVariables = [...Eventvariables, ...variables]
    variables.push(setVariables)
    triggers = setTriggers(triggers);
    json(tags, triggers, eventVariables, fullVariables);
}

function contactUs() {
    const url = document.location.pathname;
    console.log(url);
    if (url.includes('Project_DataInspector')) {
      window.open('https://github.com/amazing86400/Project_WEB_DataInspector');
    } else if (url.includes('Project_WEB_GATester')) {
      window.open('https://github.com/amazing86400/Project_WEB_GATester');
    } else if (url.includes('GTMgenerator')) {
      window.open('https://github.com/amazing86400/Project_WEB_GTMgenerator');
    }
  }

