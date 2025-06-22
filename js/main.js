const menuBtn = document.querySelector('.menu-toggle-btn');
const headerNav = document.querySelector('header nav');
if(menuBtn){
	menuBtn.addEventListener('click',()=>{
		headerNav.classList.toggle('open');
	});
}
const slides=document.querySelectorAll('.slide');
const nextBtn=document.querySelector('.arrow.right');
const prevBtn=document.querySelector('.arrow.left');
let idx=0;
const show=i=>{slides.forEach((s,n)=>s.classList.toggle('active',n===i));};
const next=()=>{idx=(idx+1)%slides.length;show(idx)};
const prev=()=>{idx=(idx-1+slides.length)%slides.length;show(idx)};
let auto=setInterval(next,4000);
[nextBtn,prevBtn].forEach(btn=>btn&&btn.addEventListener('click',()=>{btn===nextBtn?next():prev();clearInterval(auto);auto=setInterval(next,4000);}));
const noticeData=[
	'2025년 여름 행사 안내','공공시설 방역 강화','장마 대비 침수 예방','휴무 공지','전기요금 할인 신청',
	'청소년 문화센터 모집','도로 공사 교통 통제','환경정화 캠페인','노인 무료 건강검진','공원 내 흡연 금지'];
const perPage=5;let page=1;
const listEl=document.getElementById('noticeList');
const pagEl=document.getElementById('pagination');
function render(){
	listEl.innerHTML='';
	noticeData.slice((page-1)*perPage,page*perPage).forEach(txt=>{
		const li=document.createElement('li');li.textContent=txt;listEl.appendChild(li);
	});
	pagEl.innerHTML='';
	const total=Math.ceil(noticeData.length/perPage);
	for(let i=1;i<=total;i++){
		const b=document.createElement('button');b.textContent=i;b.classList.toggle('active',i===page);
		b.onclick=()=>{page=i;render();};pagEl.appendChild(b);
	}
}
render();
const apiKey='YOUR_API_KEY';
const city='Daejeon';
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=kr&appid=${apiKey}`)
.then(r=>r.json())
.then(d=>{
	if(d.main){
		document.getElementById('weatherWidget').textContent=`유성구 ${d.main.temp}°C / ${d.weather[0].description}`;
	}
}).catch(()=>{document.getElementById('weatherWidget').textContent='날씨 정보 오류';});