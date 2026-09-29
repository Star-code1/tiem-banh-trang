import {recipes,items} from './data.js';
export const emptyGrill=()=>({temperature:30,power:2,side:0,sides:[0,0]});
export function advanceGrill(g,dt){const seconds=Math.max(0,Math.min(dt,.1));g.temperature+=( [0,140,185,235][g.power]-g.temperature)*Math.min(1,seconds*.7);g.sides[g.side]=Math.min(1.1,g.sides[g.side]+seconds*(g.temperature/185)*.075);return g.sides.some(x=>x>=1);}
export function grillQuality(g){if(g.sides.some(x=>x<.5||x>=1))return 0;return g.sides.every(x=>x>=.62&&x<=.82)?3:g.sides.every(x=>x>=.55&&x<=.93)?2:1;}
export function validRuntime(r){if(r===null||r===undefined)return true;if(!Array.isArray(r.queue)||r.queue.length>3||!Number.isInteger(r.seq)||r.seq<0)return false;
 if(!r.queue.every(q=>Number.isInteger(q.id)&&q.id>0&&recipes.some(x=>x.id===q.recipe)&&Number.isInteger(q.customer)&&q.customer>=0&&q.customer<4&&Number.isFinite(q.patience)&&q.patience>0&&Number.isFinite(q.left)&&q.left>0&&q.left<=q.patience))return false;
 if(new Set(r.queue.map(q=>q.id)).size!==r.queue.length||r.queue.some(q=>q.id>r.seq))return false;
 if(!['select','cut','cook','ready'].includes(r.phase)||(r.active!==null&&!r.queue.some(q=>q.id===r.active))||(r.phase!=='select'&&r.active===null))return false;
 if(!Array.isArray(r.selected)||r.selected.length>8||new Set(r.selected).size!==r.selected.length||!r.selected.every(id=>items.some(i=>i.id===id)))return false;
 if(!Array.isArray(r.hits)||r.hits.length>3||!r.hits.every(n=>Number.isFinite(n)&&n>=0&&n<=3)||!Number.isInteger(r.cut)||r.cut<0||r.cut>3)return false;
 if(r.phase==='ready'&&!r.hits.length)return false;
 const g=r.grill;if(!g||![1,2,3].includes(g.power)||![0,1].includes(g.side)||!Number.isFinite(g.temperature)||g.temperature<0||g.temperature>250||!Array.isArray(g.sides)||g.sides.length!==2||!g.sides.every(n=>Number.isFinite(n)&&n>=0&&n<=1.1))return false;
 return true;
}
export function migrate(s){s.friendships??=[0,0,0,0];s.storyClaimed??=[];s.runtime??=null;return s;}
export const storyMilestones=[3,6,10];
export function storyReward(s,customer,chapter){migrate(s);if(!Number.isInteger(customer)||customer<0||customer>3||!Number.isInteger(chapter)||chapter<0||chapter>2)return 0;const key=`${customer}:${chapter}`;if(s.friendships[customer]<storyMilestones[chapter]||s.storyClaimed.includes(key))return 0;s.storyClaimed.push(key);const value=[12000,20000,35000][chapter];s.cash+=value;return value;}
export const stories=[
 [ ['Tấm vé đầu tiên','Linh ghé tiệm sau buổi thử việc. “Hôm ấy mình lo lắm. Phần bánh tráng của bạn làm mình thấy thành phố này bớt xa lạ.”'],['Một chỗ ngồi quen','Linh đã có việc mới. Cô vẫn đi đường vòng ngang tiệm, gọi món cũ và kể một chuyện vui mỗi chiều.'],['Lời mời mùa mới','“Cuối tuần mình dẫn cả nhóm tới nhé!” Linh để lại tấm thiệp nhỏ: Cảm ơn người đã khiến một thành phố lạ thành nhà.'] ],
 [ ['Cuối một vòng xe','Minh giao chuyến hàng cuối rồi ghé quán. Anh thích tiếng kéo cắt bánh: nghe là biết sắp được nghỉ một chút.'],['Một ngày trời mưa','Minh che giúp thùng hàng khi mưa ngang phố. “Có gì đâu, mai nhớ làm thêm xoài cho mình là được.”'],['Tiệm trong bản đồ','Minh đã thuộc từng ngõ nhưng luôn đánh dấu tiệm là điểm cuối. Anh gọi đó là trạm sạc cho một ngày dài.'] ],
 [ ['Hương vị năm xưa','Bà Sáu kể hồi còn trẻ cũng từng có một gánh hàng. Bà bảo nấu ăn ngon bắt đầu từ việc nhớ người ăn thích gì.'],['Chiếc khăn của bà','Bà mang chiếc khăn nhỏ lau bàn. “Chăm cái quầy cho sạch, rồi chăm người ghé qua cho vui, vậy là đủ rồi con.”'],['Bí quyết giữ khách','Bà cười: “Bí quyết đâu có nằm trong hũ sốt. Người ta quay lại vì ở đây có người nhớ tên mình.”'] ],
 [ ['Giờ tan học','An đặt cặp xuống ghế, khoe bài kiểm tra vừa làm tốt. Bạn ấy muốn dành tiền thưởng mua một phần thật nhiều trứng.'],['Nét vẽ đầu tiên','An vẽ lại mái bạt và chú mèo Cam trên trang cuối vở. “Sau này em muốn làm họa sĩ, vẽ cả góc phố này.”'],['Triển lãm góc quầy','Bức tranh của An được chọn treo ở lớp. Trong góc tranh có dòng chữ: Tiệm nhỏ đã nuôi một ước mơ to.'] ]
];
