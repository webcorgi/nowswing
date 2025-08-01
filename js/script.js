/**
 * Golf Club Form Management Script
 * 골프클럽 등록 폼의 각종 기능들을 관리하는 스크립트
 */

// ============================================
// 운영시간 관리 기능
// ============================================
function initOperatingHours() {
    $('.btn-hours').on('click', function() {
        $('.btn-hours').removeClass('active');
        $(this).addClass('active');
    });
}

// ============================================
// 편의시설 태그 관리 기능
// ============================================
function initAmenityTags() {
    $('.amenity-tag').on('click', function() {
        $(this).toggleClass('active');
    });
}

// ============================================
// Operating Type 태그 기능
// ============================================
function initOperatingTypeTags() {
    $('.operating-type-tag').on('click', function() {
        // Single selection - 다른 태그들 비활성화
        $('.operating-type-tag').removeClass('active');
        $(this).addClass('active');
        console.log('Operating type selected:', $(this).data('value'));
    });
}

// ============================================
// Location 태그 기능
// ============================================
function initLocationTags() {
    $('.location-tag').on('click', function() {
        $(this).toggleClass('active');
        console.log('Location tag toggled:', $(this).data('value'), 'Active:', $(this).hasClass('active'));
    });
}

// ============================================
// Cart & Caddie 토글 기능
// ============================================
function initCartCaddieToggles() {
    // Cart toggle - 슬라이더 클릭 이벤트 추가
    $('#cart-available').siblings('.toggle-slider').on('click', function() {
        const checkbox = $('#cart-available');
        checkbox.prop('checked', !checkbox.is(':checked')).trigger('change');
    });
    
    // Cart toggle change event
    $('#cart-available').on('change', function() {
        const isChecked = $(this).is(':checked');
        const feeSection = $('#cart-fee-section');
        
        if (isChecked) {
            feeSection.show();
        } else {
            feeSection.hide();
            $('#cart-additional-fee').prop('checked', false);
        }
        
        console.log('Cart available:', isChecked);
    });
    
    // Caddie toggle - 슬라이더 클릭 이벤트 추가
    $('#caddie-available').siblings('.toggle-slider').on('click', function() {
        const checkbox = $('#caddie-available');
        checkbox.prop('checked', !checkbox.is(':checked')).trigger('change');
    });
    
    // Caddie toggle change event
    $('#caddie-available').on('change', function() {
        const isChecked = $(this).is(':checked');
        const feeSection = $('#caddie-fee-section');
        
        if (isChecked) {
            feeSection.show();
        } else {
            feeSection.hide();
            $('#caddie-additional-fee').prop('checked', false);
        }
        
        console.log('Caddie available:', isChecked);
    });
    
    // Additional fee checkboxes
    $('#cart-additional-fee').on('change', function() {
        console.log('Cart additional fee:', $(this).is(':checked'));
    });
    
    $('#caddie-additional-fee').on('change', function() {
        console.log('Caddie additional fee:', $(this).is(':checked'));
    });
}

// ============================================
// 문자 카운터 기능
// ============================================
function initCharacterCounters() {
    // Golf club name counter
    const golfClubNameInput = $('#golf-club-name');
    const golfClubNameCounter = golfClubNameInput.siblings('.char-counter');
    
    if (golfClubNameInput.length && golfClubNameCounter.length) {
        golfClubNameInput.on('input', function() {
            const currentLength = $(this).val().length;
            const maxLength = 30;
            
            golfClubNameCounter.text(`${currentLength}/${maxLength} characters`);
            
            // Color coding
            golfClubNameCounter.removeClass('warning error');
            if (currentLength > maxLength * 0.8) {
                golfClubNameCounter.addClass('warning');
            }
            if (currentLength >= maxLength) {
                golfClubNameCounter.addClass('error');
            }
        });
    }
    
    // Designer name counter
    const designerInput = $('#designed-by');
    const designerCounter = designerInput.siblings('.char-counter');
    
    if (designerInput.length && designerCounter.length) {
        designerInput.on('input', function() {
            const currentLength = $(this).val().length;
            const maxLength = 30;
            
            designerCounter.text(`${currentLength}/${maxLength} characters`);
            
            // Color coding
            designerCounter.removeClass('warning error');
            if (currentLength > maxLength * 0.8) {
                designerCounter.addClass('warning');
            }
            if (currentLength >= maxLength) {
                designerCounter.addClass('error');
            }
        });
    }
}

// ============================================
// 토너먼트 이력 관리 기능
// ============================================
function onclickAddTournament() {
    $(".tournament-wrap").append(getTournamentItemTemplate());
}

// 토너먼트 항목 HTML 템플릿
function getTournamentItemTemplate() {
    return `
        <div class="tournament-item">
            <select name="tournament-year" class="tournament-year">
                <option value="">Select an year</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
            </select>
            <input type="text" placeholder="Enter a tournament name" class="tournament-name">
            <button type="button" class="btn-remove-tournament">
                <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.849609 1H7.99961H15.1496" stroke="#CFD2D7" stroke-linecap="round"/>
                </svg>
            </button>
            <button type="button" class="btn-add-tournament" onclick="onclickAddTournament()">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99961 7.99961V0.849609M7.99961 7.99961H0.849609M7.99961 7.99961V15.1496M7.99961 7.99961H15.1496" stroke="#286BB7" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `;
}
function initTournamentManagement() {
    // 토너먼트 삭제 버튼 이벤트 (동적으로 추가된 요소에도 적용)
    $(document).on('click', '.btn-remove-tournament', function() {
        $(this).closest('.tournament-item').remove();
    });
}

// ============================================
// 이미지 업로드 관리 기능
// ============================================
// 이미지 업로드 전역 변수
let uploadedImages = [];
let draggedImageIndex = -1;

function initImageUpload() {
    const imageUploadBox = document.getElementById('imageUploadBox');
    const imageInput = document.getElementById('imageInput');
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const uploadInfo = document.querySelector('.upload-info span');

    if (!imageUploadBox || !imageInput) return;

    // 기존 업로드 박스 클릭으로 파일 선택
    imageUploadBox.addEventListener('click', () => {
        imageInput.click();
    });

    // 파일 선택 이벤트
    imageInput.addEventListener('change', (e) => {
        handleImageFiles(Array.from(e.target.files));
        e.target.value = ''; // 같은 파일 다시 선택 가능하도록
    });

    // 드래그앤드롭 이벤트 (전체 업로드 영역)
    const uploadWrap = document.querySelector('.image-upload-wrap');
    
    uploadWrap.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUploadBox.style.borderColor = '#286BB7';
        imageUploadBox.style.backgroundColor = '#F0F5FF';
    });

    uploadWrap.addEventListener('dragleave', (e) => {
        e.preventDefault();
        imageUploadBox.style.borderColor = '#CFD2D7';
        imageUploadBox.style.backgroundColor = '#fff';
    });

    uploadWrap.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUploadBox.style.borderColor = '#CFD2D7';
        imageUploadBox.style.backgroundColor = '#fff';
        
        const files = Array.from(e.dataTransfer.files);
        handleImageFiles(files);
    });

    // 초기 카운터 업데이트
    updateUploadCounter();
}

// 이미지 파일 처리 함수
function handleImageFiles(files) {
    const validFiles = [];
    const invalidFiles = [];

    // 파일 검증
    files.forEach(file => {
        const validation = validateImageFile(file);
        if (validation.isValid) {
            validFiles.push(file);
        } else {
            invalidFiles.push({
                file: file,
                reason: validation.reason
            });
        }
    });

    // 파일 크기 초과 오류 메시지 표시
    if (invalidFiles.length > 0) {
        const oversizedFiles = invalidFiles.filter(item => item.reason === 'size');
        const invalidTypeFiles = invalidFiles.filter(item => item.reason === 'type');
        
        let errorMessage = '';
        
        if (oversizedFiles.length > 0) {
            const fileList = oversizedFiles.map(item => `• ${item.file.name} (${formatFileSize(item.file.size)})`).join('\n');
            errorMessage += `다음 파일들이 5MB를 초과합니다:\n${fileList}`;
        }
        
        if (invalidTypeFiles.length > 0) {
            const fileList = invalidTypeFiles.map(item => `• ${item.file.name}`).join('\n');
            if (errorMessage) errorMessage += '\n\n';
            errorMessage += `다음 파일들이 지원되지 않는 형식입니다:\n${fileList}\n(JPG, JPEG, PNG, WebP만 지원됩니다)`;
        }
        
        alert(errorMessage);
    }

    // 전체 이미지 개수 체크
    const totalImages = uploadedImages.length + validFiles.length;
    if (totalImages > 10) {
        alert(`최대 10장까지만 업로드 가능합니다.\n현재: ${uploadedImages.length}장, 추가 시도: ${validFiles.length}장`);
        return;
    }

    // 유효한 파일들 추가
    validFiles.forEach(file => {
        const imageData = {
            id: Date.now() + Math.random(),
            file: file,
            name: file.name,
            size: file.size,
            url: URL.createObjectURL(file)
        };
        uploadedImages.push(imageData);
    });

    // UI 업데이트
    updateImagePreview();
    updateUploadCounter();

    console.log('업로드된 이미지:', uploadedImages.length + '장');
}

// 파일 크기 포맷팅
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 파일 검증 함수
function validateImageFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    // 파일 타입 검증
    if (!allowedTypes.includes(file.type)) {
        return {
            isValid: false,
            reason: 'type'
        };
    }

    // 파일 크기 검증
    if (file.size > maxSize) {
        return {
            isValid: false,
            reason: 'size'
        };
    }

    return {
        isValid: true
    };
}

// 이미지 미리보기 업데이트
function updateImagePreview() {
    const container = document.getElementById('imagePreviewContainer');
    const uploadWrap = document.querySelector('.image-upload-wrap');
    
    if (!container) return;

    // 이미지가 있으면 새로운 UI 표시, 없으면 기존 UI 표시
    if (uploadedImages.length > 0) {
        uploadWrap.classList.add('has-images');
        container.classList.add('show');
        container.innerHTML = '';

        // 업로드된 이미지들 표시
        uploadedImages.forEach((image, index) => {
            const imageItem = createImagePreviewItem(image, index);
            container.appendChild(imageItem);
        });

        // 추가 업로드용 박스 (10장 미만일 때만)
        if (uploadedImages.length < 10) {
            const addMoreBox = createAddMoreBox();
            container.appendChild(addMoreBox);
        }

        // 업로드 상태 정보 표시
        updateUploadStatusInfo();
    } else {
        uploadWrap.classList.remove('has-images');
        container.classList.remove('show');
        container.innerHTML = '';
        
        // 업로드 상태 정보도 제거
        const parentContainer = container.parentElement;
        const statusInfo = parentContainer.querySelector('.upload-status-info');
        if (statusInfo) {
            statusInfo.remove();
        }
    }
}

// 이미지 미리보기 아이템 생성
function createImagePreviewItem(image, index) {
    const item = document.createElement('div');
    item.className = 'image-preview-item';
    item.draggable = true;
    item.dataset.index = index;

    item.innerHTML = `
        <img src="${image.url}" alt="${image.name}" class="image-preview-img">
        <div class="image-preview-actions">
            <button type="button" class="btn-remove-image" onclick="removeImage(${index})" title="이미지 삭제">
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 2.5H2C1.17157 2.5 0.5 3.17157 0.5 4C0.5 4.82843 1.17157 5.5 2 5.5H16C16.8284 5.5 17.5 4.82843 17.5 4C17.5 3.17157 16.8284 2.5 16 2.5H12.5M5.5 2.5H12.5M5.5 2.5C5.5 1.39543 6.39543 0.5 7.5 0.5H10.5C11.6046 0.5 12.5 1.39543 12.5 2.5M1.5 5.5L1.92603 16.5769C1.96734 17.6507 2.84989 18.5 3.92456 18.5H14.0754C15.1501 18.5 16.0327 17.6507 16.074 16.5769L16.5 5.5M10.5 15.5V8.5M7.5 15.5V8.5M4.5 15.5V8.5M13.5 15.5V8.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;

    // 드래그 이벤트
    item.addEventListener('dragstart', (e) => {
        draggedImageIndex = index;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    });

    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        draggedImageIndex = -1;
    });

    item.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (draggedImageIndex !== index) {
            item.classList.add('drag-over');
        }
    });

    item.addEventListener('dragleave', () => {
        item.classList.remove('drag-over');
    });

    item.addEventListener('drop', (e) => {
        e.preventDefault();
        item.classList.remove('drag-over');
        
        if (draggedImageIndex !== -1 && draggedImageIndex !== index) {
            moveImage(draggedImageIndex, index);
        }
    });

    return item;
}

// 추가 업로드 박스 생성
function createAddMoreBox() {
    const addBox = document.createElement('div');
    addBox.className = 'add-more-box';
    
    addBox.innerHTML = `
        <img src="../img/image_add.svg" alt="image_add">
    `;

    addBox.addEventListener('click', () => {
        document.getElementById('imageInput').click();
    });

    return addBox;
}

// 이미지 삭제
function removeImage(index) {
    if (uploadedImages[index]) {
        URL.revokeObjectURL(uploadedImages[index].url);
        uploadedImages.splice(index, 1);
        updateImagePreview();
        updateUploadCounter();
    }
}

// 이미지 순서 변경
function moveImage(fromIndex, toIndex) {
    const movedImage = uploadedImages.splice(fromIndex, 1)[0];
    uploadedImages.splice(toIndex, 0, movedImage);
    updateImagePreview();
}

// 업로드 카운터 업데이트
function updateUploadCounter() {
    const uploadInfo = document.querySelector('.upload-info span');
    if (uploadInfo) {
        uploadInfo.textContent = `Upload up to 10 images (${uploadedImages.length}/10)`;
    }
}

// 업로드 상태 정보 업데이트 (이미지 업로드 후)
function updateUploadStatusInfo() {
    const container = document.getElementById('imagePreviewContainer');
    const parentContainer = container.parentElement;
    let statusInfo = parentContainer.querySelector('.upload-status-info');
    
    // 기존 상태 정보 제거
    if (statusInfo) {
        statusInfo.remove();
    }
    
    // 새 상태 정보 생성 (컨테이너 바로 다음에 추가)
    statusInfo = document.createElement('div');
    statusInfo.className = 'upload-status-info';
    statusInfo.innerHTML = `
        <img src="../img/ico_important.svg" alt="info">
        <span>Upload up to 10 images (${uploadedImages.length}/10)</span>
    `;
    
    container.insertAdjacentElement('afterend', statusInfo);
}



// 폼 제출 시 이미지 검증
function validateImagesOnSubmit() {
    if (uploadedImages.length === 0) {
        alert('최소 1장의 이미지를 업로드해주세요.');
        return false;
    }
    return true;
}

// ============================================
// 주소 유효성 검사 기능
// ============================================
function initAddressValidation() {
    // 주소 유효성 검사 함수
    function validateAddress(address) {
        // 기본적인 주소 검증
        if (!address || address.trim().length < 5) {
            return false;
        }
        // 최소한 숫자나 문자가 포함된 주소인지 확인
        const hasLettersOrNumbers = /[a-zA-Z0-9]/.test(address);
        return hasLettersOrNumbers;
    }

    // 주소 입력 필드 실시간 검증
    $('#address').on('input blur', function() {
        const address = $(this).val();
        if (address && !validateAddress(address)) {
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });
}

// ============================================
// 무료 주소 검색 API 관리 기능
// ============================================
function initFreeAddressAPI() {
    // 주소 검색 API 관련 이벤트 처리
    const addressInput = document.getElementById('address');
    if (addressInput) {
        // 주소 입력 필드 포커스 시 error 클래스 제거
        $(addressInput).on('focus', function() {
            $(this).removeClass('error');
        });
        
        // 주소가 선택되었을 때 error 클래스 제거
        $(addressInput).on('addressSelected', function() {
            $(this).removeClass('error');
        });
    }
    
    console.log('🆓 무료 주소 검색 API 연동 완료');
}

// ============================================
// 네비게이션 메뉴 토글 기능
// ============================================
function initNavigationToggle() {
    $('.depth1').on('click', function(e) {
        e.preventDefault();
        
        const $clickedMenu = $(this);
        const $parentLi = $clickedMenu.closest('li');
        const $depth2Wrap = $parentLi.find('.depth2__wrap');
        
        // depth2__wrap이 있는 메뉴만 토글 처리
        if ($depth2Wrap.length > 0) {
            // 현재 클릭된 메뉴가 이미 활성화되어 있는지 확인
            const isCurrentlyActive = $clickedMenu.hasClass('active');
            
            // 모든 depth1에서 active 클래스 제거
            $('.depth1').removeClass('active');
            
            // 클릭된 메뉴가 비활성화 상태였다면 활성화
            if (!isCurrentlyActive) {
                $clickedMenu.addClass('active');
            }
        }
    });
}

// ============================================
// 글자수 카운터 기능
// ============================================
function initCharacterCounter() {
    $('.textarea-wrap textarea').on('input', function() {
        const $textarea = $(this);
        const currentLength = $textarea.val().length;
        const $counter = $textarea.siblings('.char-count').find('.current-count');
        
        if ($counter.length > 0) {
            $counter.text(currentLength);
        }
    });
}

// ============================================
// Part 버튼 토글 기능
// ============================================
function initPartButtons() {
    $('.part-btn').on('click', function() {
        $('.part-btn').removeClass('active');
        $(this).addClass('active');
    });
    
    // Input 삭제 버튼 (일반 X 버튼)
    $('.btn-delete-input:not(.delete-part-icon)').on('click', function() {
        $(this).siblings('input').val('');
    });
    
    // Part 삭제 아이콘 (휴지통 버튼)
    $('.btn-delete-input.delete-part-icon').on('click', function() {
        if (confirm('이 Part를 삭제하시겠습니까?')) {
            // 현재 활성화된 Part 버튼 찾기
            const $activePartBtn = $('.part-btn.active');
            
            if ($activePartBtn.length > 0 && $('.part-btn').length > 1) {
                // Part 버튼 제거
                $activePartBtn.remove();
                
                // 첫 번째 남은 Part 버튼을 활성화
                $('.part-btn').first().addClass('active');
                
                // Part name 입력 필드 초기화
                $('#part-name').val('');
            } else {
                alert('최소 하나의 Part는 유지되어야 합니다.');
            }
        }
    });
}

// ============================================
// Add Price 폼 기능
// ============================================
function initAddPriceForm() {
    // Fee Type 버튼 토글
    $('.fee-type-btn').on('click', function() {
        $('.fee-type-btn').removeClass('active');
        $(this).addClass('active');
    });
    
    // Day 버튼 토글 (다중 선택 가능)
    $('.day-btn').on('click', function() {
        $(this).toggleClass('active');
    });
    
    // Add Time 버튼
    $('.btn-add-time').on('click', function() {
        const $timeSlots = $(this).siblings('.time-slots');
        const newSlotHtml = `
            <div class="time-slot-row">
                <div class="form-group width-33">
                    <label>Start time <span class="required">*</span></label>
                    <input type="time" name="start-time" placeholder="Start time">
                </div>
                <div class="form-group width-33">
                    <label>End time <span class="required">*</span></label>
                    <input type="time" name="end-time" placeholder="End time">
                </div>
                <div class="form-group width-33">
                    <label>Price <span class="required">*</span></label>
                    <input type="number" name="price" placeholder="Price">
                </div>
            </div>
        `;
        $timeSlots.append(newSlotHtml);
    });
    
    // Add New Term 버튼
    $('.btn-add-new-term').on('click', function() {
        const newTermHtml = `
            <div class="day-group">
                <div class="day-buttons">
                    <button type="button" class="day-btn">Mon</button>
                    <button type="button" class="day-btn">Tue</button>
                    <button type="button" class="day-btn">Wed</button>
                    <button type="button" class="day-btn">Thu</button>
                    <button type="button" class="day-btn">Fri</button>
                    <button type="button" class="day-btn">Sat</button>
                    <button type="button" class="day-btn">Sun</button>
                    <button type="button" class="day-btn">Holiday</button>
                </div>
                
                <div class="time-slots">
                    <div class="time-slot-row">
                        <div class="form-group width-33">
                            <label>Start time <span class="required">*</span></label>
                            <input type="time" name="start-time" placeholder="Start time">
                        </div>
                        <div class="form-group width-33">
                            <label>End time <span class="required">*</span></label>
                            <input type="time" name="end-time" placeholder="End time">
                        </div>
                        <div class="form-group width-33">
                            <label>Price <span class="required">*</span></label>
                            <input type="number" name="price" placeholder="Price">
                        </div>
                    </div>
                </div>
                
                <button type="button" class="btn-add-time">+ Add time</button>
            </div>
        `;
        $(this).before(newTermHtml);
        
        // 새로 추가된 버튼들에 이벤트 바인딩
        initAddPriceForm();
    });
}

// ============================================
// Calendar 기능
// ============================================
function initCalendar() {
    // Calendar 페이지가 아닌 경우 실행하지 않음
    if (!document.getElementById('calendar-left')) {
        return;
    }

    // 현재 날짜
    const today = new Date();
    
    // 왼쪽 캘린더는 2025.06, 오른쪽 캘린더는 2025.07로 초기화 (이미지와 동일)
    let leftDate = new Date(2025, 5, 1); // 2025년 6월
    let rightDate = new Date(2025, 6, 1); // 2025년 7월
    
    // 선택된 날짜 범위 (이미지와 동일하게 초기 설정)
    let selectedStartDate = new Date(2025, 6, 1); // 2025년 7월 1일
    let selectedEndDate = new Date(2025, 6, 31); // 2025년 7월 31일
    let isSelectingRange = false;

    // 월 이름 배열
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // 스케줄 데이터 (사용자가 동적으로 설정 가능)
    let scheduledDates = {
        '2025-06-01': 'scheduled-public',
        '2025-06-08': 'scheduled-public',
        '2025-06-15': 'scheduled-public',
        '2025-06-22': 'scheduled-public',
        '2025-06-29': 'scheduled-public',
        '2025-07-06': 'scheduled-public',
        '2025-07-07': 'scheduled-hidden',
        '2025-07-13': 'scheduled-public',
        '2025-07-20': 'scheduled-public',
        '2025-07-27': 'scheduled-public'
    };

    // 캘린더 렌더링 함수
    function renderCalendar(date, containerId, monthId) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // 월 표시 업데이트
        document.getElementById(monthId).textContent = `${year}.${String(month + 1).padStart(2, '0')}.`;
        
        // 첫 번째 날과 마지막 날
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDay.getDay();
        const daysInMonth = lastDay.getDate();
        
        // 이전 달의 마지막 날들
        const prevMonth = new Date(year, month - 1, 0);
        const daysInPrevMonth = prevMonth.getDate();
        
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        // 이전 달의 날짜들
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const dateElement = createDateElement(day, 'other-month', year, month - 1);
            container.appendChild(dateElement);
        }
        
        // 현재 달의 날짜들
        for (let day = 1; day <= daysInMonth; day++) {
            const dateElement = createDateElement(day, 'current-month', year, month);
            container.appendChild(dateElement);
        }
        
        // 다음 달의 날짜들
        const totalCells = container.children.length;
        const remainingCells = 42 - totalCells; // 6주 * 7일
        for (let day = 1; day <= remainingCells; day++) {
            const dateElement = createDateElement(day, 'other-month', year, month + 1);
            container.appendChild(dateElement);
        }
    }

    // 날짜 요소 생성 함수
    function createDateElement(day, monthType, year, month) {
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date';
        dateElement.textContent = day;
        
        const fullDate = new Date(year, month, day);
        const dateString = formatDateString(fullDate);
        const dayOfWeek = fullDate.getDay();
        
        // 월 타입에 따른 클래스 추가
        if (monthType === 'other-month') {
            dateElement.classList.add('other-month');
        }
        
        // 요일에 따른 클래스 추가
        if (dayOfWeek === 0) {
            dateElement.classList.add('sunday');
        } else if (dayOfWeek === 6) {
            dateElement.classList.add('saturday');
        }
        
        // 오늘 날짜 표시
        if (isSameDay(fullDate, today)) {
            dateElement.classList.add('today');
        }
        
        // 스케줄된 날짜 표시
        if (scheduledDates[dateString]) {
            dateElement.classList.add(scheduledDates[dateString]);
        }
        
        // 선택된 범위 표시
        if (selectedStartDate && selectedEndDate) {
            if (fullDate >= selectedStartDate && fullDate <= selectedEndDate) {
                if (isSameDay(fullDate, selectedStartDate)) {
                    dateElement.classList.add('range-start');
                } else if (isSameDay(fullDate, selectedEndDate)) {
                    dateElement.classList.add('range-end');
                } else {
                    dateElement.classList.add('in-range');
                }
            }
        } else if (selectedStartDate && isSameDay(fullDate, selectedStartDate)) {
            dateElement.classList.add('selected');
        }
        
        // 클릭 이벤트 (날짜 선택)
        dateElement.addEventListener('click', function() {
            handleDateClick(fullDate, dateElement);
        });
        
        // 우클릭 이벤트 (스케줄 설정)
        dateElement.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showScheduleContextMenu(e, fullDate, dateString);
        });
        
        return dateElement;
    }

    // 날짜 클릭 핸들러
    function handleDateClick(clickedDate, element) {
        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
            // 새로운 범위 선택 시작
            selectedStartDate = new Date(clickedDate);
            selectedEndDate = null;
            isSelectingRange = true;
            updateSelectedRange(); // 시작 날짜 선택 시에도 업데이트
        } else if (selectedStartDate && !selectedEndDate) {
            // 범위 선택 완료
            if (clickedDate >= selectedStartDate) {
                selectedEndDate = new Date(clickedDate);
            } else {
                selectedEndDate = new Date(selectedStartDate);
                selectedStartDate = new Date(clickedDate);
            }
            isSelectingRange = false;
            updateSelectedRange();
        }
        
        // 캘린더 다시 렌더링
        renderCalendar(leftDate, 'dates-left', 'month-left');
        renderCalendar(rightDate, 'dates-right', 'month-right');
    }

    // 컨텍스트 메뉴 표시
    function showScheduleContextMenu(event, fullDate, dateString) {
        // 기존 컨텍스트 메뉴 제거
        const existingMenu = document.querySelector('.schedule-context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        // 컨텍스트 메뉴 생성
        const contextMenu = document.createElement('div');
        contextMenu.className = 'schedule-context-menu';
        contextMenu.style.cssText = `
            position: fixed;
            top: ${event.clientY}px;
            left: ${event.clientX}px;
            background: white;
            border: 1px solid #E5E9EF;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            min-width: 180px;
            padding: 8px 0;
        `;

        // 현재 상태 확인
        const currentState = scheduledDates[dateString] || 'none';

        // 메뉴 옵션들
        const options = [
            { label: 'Scheduled (Public)', value: 'scheduled-public', color: '#FDF2E5' },
            { label: 'Scheduled (Hidden)', value: 'scheduled-hidden', color: '#CFD2D7' },
            { label: 'Clear Schedule', value: 'none', color: '#ffffff' }
        ];

        options.forEach(option => {
            const menuItem = document.createElement('div');
            menuItem.className = 'context-menu-item';
            menuItem.style.cssText = `
                padding: 12px 16px;
                cursor: pointer;
                font-size: 14px;
                color: #0E1C36;
                display: flex;
                align-items: center;
                gap: 12px;
                ${currentState === option.value ? 'background-color: #f0f7ff;' : ''}
            `;

            // 색상 표시
            const colorIndicator = document.createElement('div');
            colorIndicator.style.cssText = `
                width: 16px;
                height: 16px;
                border-radius: 4px;
                background-color: ${option.color};
                border: 1px solid #E5E9EF;
            `;

            menuItem.appendChild(colorIndicator);
            menuItem.appendChild(document.createTextNode(option.label));

            // 현재 선택된 항목 표시
            if (currentState === option.value) {
                const checkmark = document.createElement('span');
                checkmark.textContent = ' ✓';
                checkmark.style.color = 'var(--MainBlue)';
                checkmark.style.marginLeft = 'auto';
                menuItem.appendChild(checkmark);
            }

            // 호버 효과
            menuItem.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f8f9fa';
            });

            menuItem.addEventListener('mouseleave', function() {
                this.style.backgroundColor = currentState === option.value ? '#f0f7ff' : '';
            });

            // 클릭 이벤트
            menuItem.addEventListener('click', function() {
                setScheduleType(dateString, option.value);
                contextMenu.remove();
            });

            contextMenu.appendChild(menuItem);
        });

        document.body.appendChild(contextMenu);

        // 외부 클릭 시 메뉴 닫기
        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                contextMenu.remove();
                document.removeEventListener('click', closeMenu);
            });
        }, 100);
    }

    // 스케줄 타입 설정
    function setScheduleType(dateString, scheduleType) {
        if (scheduleType === 'none') {
            delete scheduledDates[dateString];
        } else {
            scheduledDates[dateString] = scheduleType;
        }

        // 캘린더 다시 렌더링
        renderCalendar(leftDate, 'dates-left', 'month-left');
        renderCalendar(rightDate, 'dates-right', 'month-right');

        console.log('Schedule updated:', dateString, scheduleType);
    }

    // 선택된 범위 업데이트
    function updateSelectedRange() {
        const selectedRangeElement = document.getElementById('selected-range');
        
        if (selectedStartDate && selectedEndDate) {
            // 시작 날짜와 종료 날짜가 모두 선택된 경우
            const startDateStr = formatDisplayDate(selectedStartDate);
            const endDateStr = formatDisplayDate(selectedEndDate);
            selectedRangeElement.textContent = `Selected schedule: ${startDateStr} - ${endDateStr}`;
        } else if (selectedStartDate) {
            // 시작 날짜만 선택된 경우
            const startDateStr = formatDisplayDate(selectedStartDate);
            selectedRangeElement.textContent = `Selected schedule: ${startDateStr} - (Select end date)`;
        } else {
            // 날짜가 선택되지 않은 경우
            selectedRangeElement.textContent = 'Selected schedule: Click dates to select range';
        }
    }

    // 날짜 포맷 함수들
    function formatDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function formatDisplayDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}.`;
    }

    function isSameDay(date1, date2) {
        return date1.toDateString() === date2.toDateString();
    }

    // 이벤트 리스너 설정
    function setupEventListeners() {
        // 왼쪽 캘린더 네비게이션
        document.getElementById('prev-left').addEventListener('click', function() {
            leftDate.setMonth(leftDate.getMonth() - 1);
            renderCalendar(leftDate, 'dates-left', 'month-left');
        });

        document.getElementById('next-left').addEventListener('click', function() {
            leftDate.setMonth(leftDate.getMonth() + 1);
            renderCalendar(leftDate, 'dates-left', 'month-left');
        });

        document.getElementById('today-left').addEventListener('click', function() {
            leftDate = new Date(today.getFullYear(), today.getMonth(), 1);
            renderCalendar(leftDate, 'dates-left', 'month-left');
        });

        // 오른쪽 캘린더 네비게이션
        document.getElementById('prev-right').addEventListener('click', function() {
            rightDate.setMonth(rightDate.getMonth() - 1);
            renderCalendar(rightDate, 'dates-right', 'month-right');
        });

        document.getElementById('next-right').addEventListener('click', function() {
            rightDate.setMonth(rightDate.getMonth() + 1);
            renderCalendar(rightDate, 'dates-right', 'month-right');
        });

        document.getElementById('today-right').addEventListener('click', function() {
            rightDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
            renderCalendar(rightDate, 'dates-right', 'month-right');
        });

        // Modify 버튼
        document.querySelector('.btn-modify').addEventListener('click', function() {
            // 컨텍스트 메뉴 닫기
            const existingMenu = document.querySelector('.schedule-context-menu');
            if (existingMenu) {
                existingMenu.remove();
            }
            
            selectedStartDate = null;
            selectedEndDate = null;
            isSelectingRange = false;
            document.getElementById('selected-range').textContent = 
                'Selected schedule: Click dates to select range';
            renderCalendar(leftDate, 'dates-left', 'month-left');
            renderCalendar(rightDate, 'dates-right', 'month-right');
        });
    }

    // 초기화
    setupEventListeners();
    renderCalendar(leftDate, 'dates-left', 'month-left');
    renderCalendar(rightDate, 'dates-right', 'month-right');
    
    // 초기 상태에서는 선택된 날짜가 없으므로 기본 메시지 표시
    selectedStartDate = null;
    selectedEndDate = null;
    updateSelectedRange();
}

// ============================================
// Add Schedule 페이지 기능
// ============================================
function initAddScheduleForm() {
    // Course 탭 버튼 클릭 이벤트
    $('.course-tab').on('click', function() {
        $('.course-tab').removeClass('active');
        $(this).addClass('active');
        
        // 탭에 따른 데이터 로드 로직을 여기에 추가할 수 있습니다
        const courseNumber = $(this).data('course');
        console.log('Course ' + courseNumber + ' selected');
    });
    
    // 토글 스위치 상태 변경 시 로직
    $('#schedule-status').on('change', function() {
        const isChecked = $(this).is(':checked');
        console.log('Schedule status:', isChecked ? 'Active' : 'Inactive');
        
        // Tee time과 Price 필드 활성화/비활성화
        const teeTimeField = $('#tee-time');
        const priceField = $('#price');
        const deleteBtn = $('.schedule-delete');
        
        if (isChecked) {
            // 토글이 ON일 때 - 필드 활성화, Delete 버튼 숨기기
            teeTimeField.prop('disabled', false);
            priceField.prop('disabled', false);
            teeTimeField.removeClass('disabled');
            priceField.removeClass('disabled');
            deleteBtn.hide();
        } else {
            // 토글이 OFF일 때 - 필드 비활성화, Delete 버튼 보이기
            teeTimeField.prop('disabled', true);
            priceField.prop('disabled', true);
            teeTimeField.addClass('disabled');
            priceField.addClass('disabled');
            // 에러 상태도 제거
            teeTimeField.removeClass('error');
            priceField.removeClass('error');
            deleteBtn.show();
        }
    });
    
    // 페이지 로드 시 초기 상태 설정
    const initialStatus = $('#schedule-status').is(':checked');
    if (!initialStatus) {
        $('#tee-time, #price').prop('disabled', true).addClass('disabled');
        $('.schedule-delete').show();
    } else {
        $('.schedule-delete').hide();
    }
    
    // 폼 제출 시 검증
    $('.add-schedule-form').on('submit', function(e) {
        e.preventDefault();
        
        // 기본 필수 필드
        let requiredFields = ['course-status'];
        
        // 토글이 ON일 때만 tee-time과 price를 필수 필드에 추가
        const isScheduleActive = $('#schedule-status').is(':checked');
        if (isScheduleActive) {
            requiredFields.push('tee-time', 'price');
        }
        
        let hasError = false;
        
        requiredFields.forEach(function(fieldName) {
            const field = $('[name="' + fieldName + '"]');
            if (!field.val()) {
                field.addClass('error');
                hasError = true;
            } else {
                field.removeClass('error');
            }
        });
        
        if (!hasError) {
            console.log('Form submitted successfully');
            // 실제 제출 로직을 여기에 구현
        } else {
            alert('Please fill in all required fields.');
        }
    });
    
    // 입력 필드 포커스 시 에러 상태 제거
    $('.add-schedule-form input, .add-schedule-form select').on('focus', function() {
        $(this).removeClass('error');
    });
    
    // Delete 버튼 클릭 시 처리
    $('.schedule-delete').on('click', function() {
        if (confirm('Are you sure you want to delete this schedule?')) {
            console.log('Schedule deleted');
            // 실제 삭제 로직을 여기에 구현
            // 예: 서버에 삭제 요청 보내기, 이전 페이지로 이동 등
            // window.history.back(); // 이전 페이지로 이동
        }
    });
}

// ============================================
// 티타임 테이블 행 높이 동기화 기능
// ============================================
function initTeeTimeTableSync() {
    // 티타임 테이블 페이지가 아닌 경우 실행하지 않음
    if (!document.querySelector('.tee-time-main-grid')) {
        return;
    }

    let isUpdating = false; // 무한 루프 방지 플래그
    let observer;

    function syncRowHeights() {
        // 이미 업데이트 중이면 실행하지 않음
        if (isUpdating) return;
        
        isUpdating = true;
        
        // MutationObserver 일시 중단
        if (observer) {
            observer.disconnect();
        }

        const subTimeCards = document.querySelectorAll('.sub-time-card');
        const courseColumns = document.querySelectorAll('.course-column-main');
        
        // 먼저 모든 높이 스타일 초기화
        subTimeCards.forEach(card => {
            card.style.height = 'auto';
        });
        courseColumns.forEach(column => {
            Array.from(column.children).forEach(card => {
                card.style.height = 'auto';
            });
        });
        
        // 브라우저가 auto 높이를 계산할 시간을 줌
        setTimeout(() => {
            // 각 시간 슬롯별로 높이 동기화
            subTimeCards.forEach((subTimeCard, index) => {
                let maxHeight = subTimeCard.offsetHeight;
                const timeSlotCards = [];
                
                // 각 코스 컬럼에서 같은 인덱스의 시간 슬롯 카드 찾기
                courseColumns.forEach(column => {
                    const timeSlotCard = column.children[index];
                    if (timeSlotCard) {
                        timeSlotCards.push(timeSlotCard);
                        maxHeight = Math.max(maxHeight, timeSlotCard.offsetHeight);
                    }
                });
                
                // 최대 높이로 모든 카드 높이 설정
                if (maxHeight > 0) {
                    subTimeCard.style.height = maxHeight + 'px';
                    timeSlotCards.forEach(card => {
                        card.style.height = maxHeight + 'px';
                    });
                }
            });
            
            // 업데이트 완료 후 MutationObserver 재시작
            setTimeout(() => {
                isUpdating = false;
                startObserver();
            }, 50);
        }, 10);
    }

    function startObserver() {
        const teeTimeGrid = document.querySelector('.tee-time-main-grid');
        if (teeTimeGrid && !isUpdating) {
            observer = new MutationObserver((mutations) => {
                // 높이 관련 변경이 아닌 경우에만 동기화 실행
                let shouldSync = false;
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList' || 
                        (mutation.type === 'attributes' && 
                         mutation.attributeName === 'class')) {
                        shouldSync = true;
                    }
                });
                
                if (shouldSync && !isUpdating) {
                    setTimeout(syncRowHeights, 100);
                }
            });
            
            observer.observe(teeTimeGrid, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class'] // style 속성 제외
            });
        }
    }

    // 초기 높이 동기화
    setTimeout(syncRowHeights, 100);
    
    // 윈도우 리사이즈 시 재동기화
    window.addEventListener('resize', () => {
        if (!isUpdating) {
            setTimeout(syncRowHeights, 100);
        }
    });
}

// ============================================
// 커스텀 드롭다운 기능
// ============================================
function initCustomDropdown() {
    const statusDropdowns = document.querySelectorAll('.status-select-wrapper');
    
    statusDropdowns.forEach(wrapper => {
        const select = wrapper.querySelector('.status-select');
        const options = wrapper.querySelector('.status-dropdown-options');
        const statusText = wrapper.querySelector('.status-text');
        const statusDot = wrapper.querySelector('.status-select .status-dot');
        
        if (!select || !options || !statusText || !statusDot) return;
        
        // 드롭다운 클릭 시 열기/닫기
        select.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 다른 드롭다운 닫기
            statusDropdowns.forEach(otherWrapper => {
                if (otherWrapper !== wrapper) {
                    otherWrapper.classList.remove('active');
                }
            });
            
            // 현재 드롭다운 토글
            wrapper.classList.toggle('active');
        });
        
        // 옵션 클릭 시 선택
        options.addEventListener('click', function(e) {
            const option = e.target.closest('.status-option');
            if (!option) return;
            
            const value = option.getAttribute('data-value');
            const text = option.querySelector('span:last-child').textContent;
            const statusDotElement = option.querySelector('.status-dot');
            
            // 선택된 값 업데이트
            select.setAttribute('data-value', value);
            statusText.textContent = text;
            
            // 상태 점 색상 업데이트
            statusDot.className = 'status-dot';
            
            // none 옵션이 아닌 경우에만 색상 클래스 추가
            if (statusDotElement && value !== 'none') {
                const dotColor = statusDotElement.className;
                const colorClass = dotColor.split(' ').find(cls => cls !== 'status-dot');
                if (colorClass) {
                    statusDot.classList.add(colorClass);
                }
            } else if (value === 'none') {
                // none 옵션의 경우 점을 숨기거나 기본 상태로 설정
                statusDot.style.display = 'none';
            } else {
                // 다른 옵션 선택 시 점 다시 표시
                statusDot.style.display = '';
            }
            
            // 텍스트 색상은 CSS의 data-value 기반 스타일로 자동 적용됨
            
            // no-show 선택 시 통계 숫자 색상 변경
            const noShowStatElement = document.querySelector('.stat-number.no-show');
            if (noShowStatElement) {
                if (value === 'no-show') {
                    noShowStatElement.style.color = '#8A2BE2';
                } else {
                    noShowStatElement.style.color = '#EF4444'; // 원래 색상으로 복원
                }
            }
            
            // 드롭다운 닫기
            wrapper.classList.remove('active');
        });
    });
    
    // 외부 클릭 시 모든 드롭다운 닫기
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.status-select-wrapper')) {
            statusDropdowns.forEach(wrapper => {
                wrapper.classList.remove('active');
            });
        }
    });
}

// ============================================
// Reservation List 페이지 기능
// ============================================
function initReservationList() {
    // Reservation 페이지가 아닌 경우 실행하지 않음
    if (!document.querySelector('.reservation-search-section')) {
        return;
    }

    // 검색 기능
    $('.btn-search').on('click', function() {
        const searchValue = $('.search-input').val();
        const startDate = $('.date-input').eq(0).val();
        const endDate = $('.date-input').eq(1).val();
        
        console.log('Search:', searchValue, 'Start:', startDate, 'End:', endDate);
        
        // 실제 검색 로직을 여기에 구현
        performSearch(searchValue, startDate, endDate);
    });

    // 리셋 기능
    $('.btn-reset').on('click', function() {
        $('.search-input').val('');
        $('.date-input').val('');
        $('.filter-select').val('all');
        
        console.log('Reset filters');
        
        // 테이블을 원래 상태로 복원
        resetTable();
    });

    // 필터 변경 이벤트
    $('.filter-select').on('change', function() {
        const filterType = $(this).closest('.filter-group').find('.filter-label').text().toLowerCase();
        const filterValue = $(this).val();
        
        console.log('Filter changed:', filterType, filterValue);
        
        // 실제 필터링 로직을 여기에 구현
        applyFilter(filterType, filterValue);
    });

    // 테이블 정렬 기능
    $('.course-table th.sortable').on('click', function() {
        const column = $(this).attr('class').split(' ')[0]; // date-col 같은 클래스명 추출
        const currentSort = $(this).attr('data-sort') || 'asc';
        const newSort = currentSort === 'asc' ? 'desc' : 'asc';
        
        // 모든 정렬 상태 초기화
        $('.course-table th.sortable').removeAttr('data-sort');
        $('.course-table .sort-icon').removeClass('sorted-asc sorted-desc');
        
        // 현재 컬럼 정렬 상태 설정
        $(this).attr('data-sort', newSort);
        $(this).find('.sort-icon').addClass(newSort === 'asc' ? 'sorted-asc' : 'sorted-desc');
        
        console.log('Sort by:', column, newSort);
        
        // 실제 정렬 로직을 여기에 구현
        sortTable(column, newSort);
    });
    
    // 날짜 입력 필드 클릭 시 달력 표시 (실제 구현은 날짜 picker 라이브러리 필요)
    $('.calendar-icon').on('click', function() {
        const dateInput = $(this).siblings('.date-input');
        dateInput.focus();
        
        console.log('Calendar icon clicked for:', dateInput.attr('placeholder'));
        
        // 실제 날짜 선택기를 여기에 구현
        // 예: datepicker 라이브러리 호출
    });
}

// 검색 실행 함수
function performSearch(searchValue, startDate, endDate) {
    const rows = $('.course-table tbody tr');
    
    rows.each(function() {
        const row = $(this);
        const id = row.find('.course-link').text().toLowerCase();
        const name = row.find('.name-col').text().toLowerCase();
        const email = row.find('.email-col').text().toLowerCase();
        const date = row.find('.date-col').text();
        
        let showRow = true;
        
        // 텍스트 검색
        if (searchValue) {
            const searchLower = searchValue.toLowerCase();
            const matchesText = id.includes(searchLower) || 
                               name.includes(searchLower) || 
                               email.includes(searchLower);
            if (!matchesText) {
                showRow = false;
            }
        }
        
        // 날짜 범위 검색 (간단한 문자열 비교, 실제로는 Date 객체 사용 권장)
        if (startDate && date < startDate.replace(/\./g, '.')) {
            showRow = false;
        }
        if (endDate && date > endDate.replace(/\./g, '.')) {
            showRow = false;
        }
        
        if (showRow) {
            row.show();
        } else {
            row.hide();
        }
    });
}

// 필터 적용 함수
function applyFilter(filterType, filterValue) {
    if (filterValue === 'all') {
        $('.course-table tbody tr').show();
        return;
    }
    
    const rows = $('.course-table tbody tr');
    
    rows.each(function() {
        const row = $(this);
        let columnValue = '';
        
        switch(filterType) {
            case 'status':
                columnValue = row.find('.status-badge').attr('class').split(' ')[1]; // reserved, checked-in 등
                break;
            case 'reserved on':
                columnValue = row.find('.reserved-on-col').text().toLowerCase();
                break;
            case 'course':
                columnValue = row.find('.course-col').text().toLowerCase().replace(' ', '');
                break;
        }
        
        if (columnValue === filterValue || 
            (filterType === 'course' && columnValue === filterValue.replace('course', 'course '))) {
            row.show();
        } else {
            row.hide();
        }
    });
}

// 테이블 정렬 함수
function sortTable(column, direction) {
    const tbody = $('.course-table tbody');
    const rows = tbody.find('tr').toArray();
    
    rows.sort(function(a, b) {
        let aValue, bValue;
        
        switch(column) {
            case 'date-col':
                aValue = $(a).find('.date-col').text();
                bValue = $(b).find('.date-col').text();
                // 날짜 정렬을 위해 문자열을 Date 객체로 변환
                aValue = new Date(aValue.replace(/\./g, '-'));
                bValue = new Date(bValue.replace(/\./g, '-'));
                break;
            case 'id-col':
                aValue = $(a).find('.course-link').text();
                bValue = $(b).find('.course-link').text();
                break;
            default:
                aValue = $(a).find('.' + column).text();
                bValue = $(b).find('.' + column).text();
        }
        
        if (direction === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
    
    tbody.empty().append(rows);
}

// 테이블 리셋 함수
function resetTable() {
    $('.course-table tbody tr').show();
    $('.course-table th.sortable').removeAttr('data-sort');
    $('.course-table .sort-icon').removeClass('sorted-asc sorted-desc');
}

// 예약 상세 정보 표시 함수
function showReservationDetails(reservationId) {
    // 실제로는 모달을 띄우거나 상세 페이지로 이동
    alert('예약 상세 정보: ' + reservationId);
    
    // 예시: 모달 표시 또는 페이지 이동
    // window.location.href = './reservation-detail.html?id=' + reservationId;
}

// ============================================
// 전체 초기화 함수
// ============================================
function initializeGolfClubForm() {
    // 각 기능 초기화
    initOperatingHours();
    initAmenityTags();
    initOperatingTypeTags();
    initLocationTags();
    initCartCaddieToggles();
    initCharacterCounters();
    initTournamentManagement();
    initImageUpload();
    initAddressValidation();
    initFreeAddressAPI();
    initNavigationToggle();
    initCharacterCounter();
    initPartButtons();
    initAddPriceForm();
    initCalendar();
    initAddScheduleForm();
    initTeeTimeTableSync();
    initCustomDropdown();
    initReservationList();
    
    // 폼 제출 시 이미지 검증
    const golfClubForm = document.querySelector('.page__dashboard_form form');
    if (golfClubForm) {
        golfClubForm.addEventListener('submit', function(e) {
            if (!validateImagesOnSubmit()) {
                e.preventDefault();
                
                // 이미지 업로드 섹션으로 스크롤
                const imageSection = document.querySelector('.image-upload-wrap');
                if (imageSection) {
                    imageSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                return false;
            }
        });
    }
}

// ============================================
// DOM 준비 완료 시 초기화 실행
// ============================================
$(document).ready(function() {
    initializeGolfClubForm();
});
