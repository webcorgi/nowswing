# 🗺️ OpenStreetMap Nominatim API 사용 가이드

## 📋 목차

1. [개요](#개요)
2. [Nominatim API 소개](#nominatim-api-소개)
3. [구현 방법](#구현-방법)
4. [API 사용법](#api-사용법)
5. [장단점](#장단점)
6. [사용 정책 및 제한사항](#사용-정책-및-제한사항)
7. [실제 구현 예제](#실제-구현-예제)
8. [트러블슈팅](#트러블슈팅)
9. [대안 API](#대안-api)
10. [참고 자료](#참고-자료)

---

## 🌍 개요

**OpenStreetMap(OSM)**은 전 세계의 지도 데이터를 자유롭게 사용할 수 있는 오픈소스 프로젝트입니다. 위키피디아와 같이 누구나 편집할 수 있으며, 상업적 용도로도 자유롭게 사용 가능합니다.

**Nominatim**은 OpenStreetMap 데이터를 기반으로 하는 지오코딩(주소→좌표) 및 역지오코딩(좌표→주소) 서비스입니다.

### 🔑 핵심 특징
- ✅ **완전 무료** - API 키 불필요
- ✅ **오픈소스** - 투명한 데이터와 코드
- ✅ **전 세계 지원** - 전 세계 주소 데이터 제공
- ✅ **상업적 사용 가능** - 라이선스 제약 없음

---

## 🔍 Nominatim API 소개

Nominatim은 OpenStreetMap의 공식 지오코딩 서비스로, 다음과 같은 기능을 제공합니다:

### 주요 기능
1. **Search (검색)**: 주소나 장소명으로 좌표 찾기
2. **Reverse (역검색)**: 좌표로 주소 찾기
3. **Lookup**: OSM ID로 정보 조회
4. **Details**: 특정 장소의 상세 정보

### API 엔드포인트
- **검색**: `https://nominatim.openstreetmap.org/search`
- **역검색**: `https://nominatim.openstreetmap.org/reverse`
- **조회**: `https://nominatim.openstreetmap.org/lookup`

---

## 🛠️ 구현 방법

### 1. 기본 검색 API 호출

```javascript
async function searchAddress(query) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query)}`,
            {
                headers: {
                    'User-Agent': 'YourAppName/1.0' // 필수 헤더
                }
            }
        );
        
        if (!response.ok) throw new Error('API 호출 실패');
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('주소 검색 오류:', error);
        return [];
    }
}
```

### 2. 역지오코딩 (좌표 → 주소)

```javascript
async function reverseGeocode(lat, lon) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
            {
                headers: {
                    'User-Agent': 'YourAppName/1.0'
                }
            }
        );
        
        if (!response.ok) throw new Error('역지오코딩 실패');
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('역지오코딩 오류:', error);
        return null;
    }
}
```

---

## 📡 API 사용법

### 검색 API 파라미터

| 파라미터 | 설명 | 예시 |
|----------|------|------|
| `q` | 검색 쿼리 (필수) | `Seoul` |
| `format` | 응답 형식 | `json`, `xml` |
| `limit` | 결과 개수 제한 | `5` (기본값: 10) |
| `addressdetails` | 상세 주소 정보 포함 | `1` |
| `countrycodes` | 국가 코드 제한 | `kr,us,jp` |
| `viewbox` | 검색 영역 제한 | `lon1,lat1,lon2,lat2` |
| `bounded` | viewbox 내부로 제한 | `1` |

### 응답 데이터 구조

```json
[
  {
    "place_id": 259127396,
    "licence": "Data © OpenStreetMap contributors...",
    "osm_type": "relation",
    "osm_id": 1946295,
    "boundingbox": ["37.4265", "37.7012", "126.7347", "127.2691"],
    "lat": "37.5666791",
    "lon": "126.9782914",
    "display_name": "서울특별시, 대한민국",
    "class": "place",
    "type": "city",
    "importance": 0.8827132175293648,
    "address": {
      "city": "서울특별시",
      "country": "대한민국",
      "country_code": "kr"
    }
  }
]
```

---

## ⚖️ 장단점

### ✅ 장점

1. **완전 무료**
   - API 키 불필요
   - 사용량 제한 거의 없음
   - 상업적 사용 가능

2. **오픈소스**
   - 투명한 데이터
   - 커뮤니티 기여 가능
   - 라이선스 제약 없음

3. **광범위한 지원**
   - 전 세계 모든 지역
   - 다양한 언어 지원
   - 지속적인 업데이트

4. **유연성**
   - 다양한 검색 옵션
   - 커스터마이징 가능
   - 자체 서버 구축 가능

### ❌ 단점

1. **정확도**
   - Google Places API 대비 낮은 정확도
   - 일부 지역 데이터 부족
   - 최신 건물/도로 정보 지연

2. **성능**
   - 상대적으로 느린 응답 속도
   - 서버 부하 시 지연 발생
   - 동시 요청 수 제한

3. **상업적 지원**
   - 공식 기술 지원 없음
   - SLA 보장 없음
   - 서비스 중단 위험

---

## 📋 사용 정책 및 제한사항

### 🚨 Nominatim 사용 정책

1. **User-Agent 헤더 필수**
   ```javascript
   headers: {
       'User-Agent': 'YourAppName/1.0 (contact@yourapp.com)'
   }
   ```

2. **요청 빈도 제한**
   - **최대 1초에 1번** 요청
   - 대량 요청 시 자체 서버 구축 권장

3. **캐싱 권장**
   - 동일한 쿼리 반복 요청 금지
   - 결과를 로컬에 캐시

4. **금지 사항**
   - 자동화된 대량 요청
   - 불필요한 반복 요청
   - 악의적인 사용

### 📊 사용량 가이드라인

| 사용 형태 | 권장 사항 |
|-----------|-----------|
| **개발/테스트** | 제한 없음 |
| **소규모 앱** | 하루 100-1000회 |
| **중간 규모** | 자체 서버 고려 |
| **대규모** | 자체 Nominatim 서버 구축 |

---

## 💻 실제 구현 예제

### 완전한 주소 자동완성 구현

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .address-container {
            position: relative;
            width: 300px;
        }
        
        .address-input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        
        .suggestions-container {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ccc;
            border-top: none;
            max-height: 200px;
            overflow-y: auto;
            z-index: 1000;
        }
        
        .suggestion-item {
            padding: 10px;
            cursor: pointer;
            border-bottom: 1px solid #eee;
        }
        
        .suggestion-item:hover {
            background-color: #f0f0f0;
        }
    </style>
</head>
<body>
    <div class="address-container">
        <input type="text" class="address-input" placeholder="주소를 입력하세요...">
        <div class="suggestions-container" style="display: none;"></div>
    </div>

    <script>
        class AddressAutocomplete {
            constructor(inputElement, suggestionsElement) {
                this.input = inputElement;
                this.suggestions = suggestionsElement;
                this.timeout = null;
                this.currentSuggestions = [];
                
                this.bindEvents();
            }
            
            bindEvents() {
                this.input.addEventListener('input', (e) => {
                    const query = e.target.value.trim();
                    
                    if (query.length < 3) {
                        this.hideSuggestions();
                        return;
                    }
                    
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => {
                        this.searchAddresses(query);
                    }, 300);
                });
                
                document.addEventListener('click', (e) => {
                    if (!this.input.contains(e.target) && !this.suggestions.contains(e.target)) {
                        this.hideSuggestions();
                    }
                });
            }
            
            async searchAddresses(query) {
                try {
                    this.showLoading();
                    
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query)}`,
                        {
                            headers: {
                                'User-Agent': 'AddressAutocomplete/1.0'
                            }
                        }
                    );
                    
                    if (!response.ok) throw new Error('검색 실패');
                    
                    const data = await response.json();
                    this.displaySuggestions(data);
                    
                } catch (error) {
                    console.error('주소 검색 오류:', error);
                    this.showError('주소 검색 중 오류가 발생했습니다.');
                }
            }
            
            displaySuggestions(suggestions) {
                if (suggestions.length === 0) {
                    this.suggestions.innerHTML = '<div class="suggestion-item">검색 결과가 없습니다.</div>';
                } else {
                    this.suggestions.innerHTML = suggestions.map(item => 
                        `<div class="suggestion-item" data-address="${item.display_name}">
                            ${item.display_name}
                        </div>`
                    ).join('');
                    
                    // 클릭 이벤트 추가
                    this.suggestions.querySelectorAll('.suggestion-item').forEach(item => {
                        item.addEventListener('click', () => {
                            this.selectAddress(item.dataset.address);
                        });
                    });
                }
                
                this.suggestions.style.display = 'block';
            }
            
            selectAddress(address) {
                this.input.value = address;
                this.hideSuggestions();
                console.log('선택된 주소:', address);
            }
            
            showLoading() {
                this.suggestions.innerHTML = '<div class="suggestion-item">검색 중...</div>';
                this.suggestions.style.display = 'block';
            }
            
            showError(message) {
                this.suggestions.innerHTML = `<div class="suggestion-item">${message}</div>`;
                this.suggestions.style.display = 'block';
            }
            
            hideSuggestions() {
                this.suggestions.style.display = 'none';
            }
        }
        
        // 초기화
        document.addEventListener('DOMContentLoaded', () => {
            const input = document.querySelector('.address-input');
            const suggestions = document.querySelector('.suggestions-container');
            
            new AddressAutocomplete(input, suggestions);
        });
    </script>
</body>
</html>
```

---

## 🔧 트러블슈팅

### 자주 발생하는 문제들

#### 1. CORS 오류
```
Access to fetch at 'https://nominatim.openstreetmap.org/...' from origin '...' has been blocked by CORS policy
```

**해결 방법:**
- Nominatim은 CORS를 지원하므로, 다른 설정 문제일 가능성
- HTTPS 사이트에서 HTTP API 호출 시 발생 (Mixed Content)
- User-Agent 헤더 누락 확인

#### 2. Too Many Requests (429 Error)
```
HTTP Error 429: Too Many Requests
```

**해결 방법:**
```javascript
// 요청 간격 제한
let lastRequestTime = 0;
const MIN_INTERVAL = 1000; // 1초

async function searchWithDelay(query) {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < MIN_INTERVAL) {
        await new Promise(resolve => 
            setTimeout(resolve, MIN_INTERVAL - timeSinceLastRequest)
        );
    }
    
    lastRequestTime = Date.now();
    return searchAddresses(query);
}
```

#### 3. User-Agent 오류
```
HTTP Error 403: Forbidden (User-Agent header required)
```

**해결 방법:**
```javascript
fetch(url, {
    headers: {
        'User-Agent': 'YourAppName/1.0 (contact@yourapp.com)'
    }
})
```

#### 4. 검색 결과 없음

**개선 방법:**
```javascript
// 다양한 검색 전략 사용
async function smartSearch(query) {
    // 1차: 정확한 검색
    let results = await searchAddresses(query);
    
    if (results.length === 0) {
        // 2차: 부분 검색
        const keywords = query.split(' ').filter(word => word.length > 2);
        if (keywords.length > 1) {
            results = await searchAddresses(keywords.join(' '));
        }
    }
    
    if (results.length === 0) {
        // 3차: 첫 번째 키워드만 검색
        if (keywords.length > 0) {
            results = await searchAddresses(keywords[0]);
        }
    }
    
    return results;
}
```

---

## 🔄 대안 API

### 1. 다른 무료 지오코딩 서비스

#### MapBox Geocoding API
```javascript
// 월 100,000회 무료
const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}`
);
```

#### HERE Geocoding API
```javascript
// 월 250,000회 무료
const response = await fetch(
    `https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=${apiKey}`
);
```

#### LocationIQ
```javascript
// 하루 5,000회 무료
const response = await fetch(
    `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${query}&format=json`
);
```

### 2. 한국 전용 서비스

#### 카카오 주소 검색 API
```javascript
const response = await fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${query}`,
    {
        headers: {
            'Authorization': `KakaoAK ${apiKey}`
        }
    }
);
```

#### 네이버 지오코딩 API
```javascript
const response = await fetch(
    `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query}`,
    {
        headers: {
            'X-NCP-APIGW-API-KEY-ID': clientId,
            'X-NCP-APIGW-API-KEY': clientSecret
        }
    }
);
```

---

## 📈 성능 최적화

### 1. 캐싱 전략

```javascript
class AddressCache {
    constructor(maxSize = 100) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }
    
    get(query) {
        if (this.cache.has(query)) {
            // LRU: 최근 사용된 항목을 맨 뒤로 이동
            const value = this.cache.get(query);
            this.cache.delete(query);
            this.cache.set(query, value);
            return value;
        }
        return null;
    }
    
    set(query, results) {
        if (this.cache.size >= this.maxSize) {
            // 가장 오래된 항목 제거
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(query, results);
    }
}

const addressCache = new AddressCache();

async function cachedSearch(query) {
    // 캐시 확인
    let results = addressCache.get(query);
    if (results) {
        console.log('캐시에서 결과 반환');
        return results;
    }
    
    // API 호출
    results = await searchAddresses(query);
    
    // 캐시에 저장
    if (results.length > 0) {
        addressCache.set(query, results);
    }
    
    return results;
}
```

### 2. 디바운싱과 쓰로틀링

```javascript
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 사용 예시
const debouncedSearch = debounce(searchAddresses, 300);
```

---

## 🏗️ 자체 Nominatim 서버 구축

대규모 서비스의 경우 자체 Nominatim 서버 구축을 고려할 수 있습니다.

### Docker를 이용한 간단 구축

```dockerfile
# docker-compose.yml
version: '3'
services:
  nominatim:
    image: mediagis/nominatim:4.0
    ports:
      - "8080:8080"
    environment:
      - PBF_URL=https://download.geofabrik.de/asia/south-korea-latest.osm.pbf
      - REPLICATION_URL=https://download.geofabrik.de/asia/south-korea-updates/
    volumes:
      - nominatim-data:/var/lib/postgresql/12/main
    shm_size: 1gb

volumes:
  nominatim-data:
```

### 실행
```bash
docker-compose up -d
```

---

## 📚 참고 자료

### 공식 문서
- [Nominatim API Documentation](https://nominatim.org/release-docs/develop/api/Overview/)
- [OpenStreetMap Wiki - Nominatim](https://wiki.openstreetmap.org/wiki/Nominatim)
- [Nominatim Usage Policy](https://operations.osmfoundation.org/policies/nominatim/)

### 유용한 도구
- [Nominatim Debug Interface](https://nominatim.openstreetmap.org/)
- [OSM Data Browser](https://www.openstreetmap.org/)
- [Overpass Turbo](https://overpass-turbo.eu/) - OSM 데이터 쿼리 도구

### 커뮤니티
- [OSM Community Forum](https://community.openstreetmap.org/)
- [OSM Help](https://help.openstreetmap.org/)
- [GitHub - Nominatim](https://github.com/osm-search/Nominatim)

---

## 📝 결론

OpenStreetMap Nominatim API는 무료로 사용할 수 있는 강력한 지오코딩 서비스입니다. Google Places API에 비해 정확도는 다소 떨어질 수 있지만, 비용 부담 없이 전 세계 주소 검색 기능을 구현할 수 있어 많은 프로젝트에서 유용하게 활용할 수 있습니다.

특히 다음과 같은 경우에 권장됩니다:

✅ **예산이 제한된 프로젝트**  
✅ **오픈소스 프로젝트**  
✅ **프로토타입 개발**  
✅ **중간 정도 정확도면 충분한 서비스**  

사용 정책을 준수하고 적절한 캐싱 전략을 사용한다면, 매우 효과적인 주소 검색 솔루션이 될 수 있습니다.

---

**문서 작성일**: 2024년  
**마지막 업데이트**: 2024년  
**작성자**: Golf Club Website Team 