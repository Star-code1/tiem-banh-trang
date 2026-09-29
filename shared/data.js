export const items=[
 ['paper','Bánh tráng',0,2000,10,'base'],['mango','Xoài xanh',1,1500,1,'veg'],['beef','Khô bò',2,4000,10,'top'],['egg','Trứng cút',3,2000,2,'top'],['shrimp','Tép sấy',4,1500,15,'top'],['herb','Rau răm',5,500,1,'veg'],['chili','Sa tế',6,1000,15,'sauce'],['tamarind','Sốt me',7,1500,7,'sauce'],['onion','Hành phi',4,1000,15,'top'],['peanut','Đậu phộng',4,1000,20,'top'],['lime','Tắc tươi',1,500,3,'veg'],['salt','Muối tôm',6,500,30,'sauce'],['butter','Bơ trứng',7,2500,4,'sauce'],['chicken','Khô gà',2,3000,10,'top'],['squid','Khô mực',2,4500,10,'top'],['black','Nước bò',7,1500,7,'sauce'],['dew','Phơi sương',0,3000,5,'base'],['prawn','Dẻo tôm',0,3500,7,'base'],['sesame','Bánh mè',0,3000,15,'base']
].map(([id,name,sprite,cost,life,type])=>({id,name,sprite,cost,life,type}));
export const recipes=[
 {id:'classic',name:'Trộn góc phố',sub:'Chua nhẹ, giòn vui',method:'mix',ingredients:['paper','mango','shrimp','salt'],price:25000,level:1,sprite:12},
 {id:'beef',name:'Trộn khô bò',sub:'Đậm đà đúng điệu',method:'mix',ingredients:['paper','mango','beef','chili'],price:35000,level:1,sprite:12},
 {id:'egg',name:'Trộn trứng cút',sub:'Béo bùi, mê ly',method:'mix',ingredients:['paper','egg','herb','tamarind'],price:30000,level:1,sprite:12},
 {id:'grill',name:'Nướng Đà Lạt',sub:'Giòn tan bên bếp',method:'grill',ingredients:['sesame','egg','shrimp','butter'],price:42000,level:2,sprite:13},
 {id:'roll',name:'Cuốn bơ trứng',sub:'Cuốn chút thương',method:'roll',ingredients:['dew','butter','beef','herb'],price:46000,level:3,sprite:14},
 {id:'chicken',name:'Trộn lá chanh',sub:'Thơm cả góc phố',method:'mix',ingredients:['prawn','chicken','onion','lime'],price:40000,level:2,sprite:12},
 {id:'sea',name:'Trộn hải vị',sub:'Vị biển đầu hẻm',method:'mix',ingredients:['paper','squid','peanut','black'],price:49000,level:3,sprite:12}
];
export const customers=[{name:'Linh',sprite:8,line:'Cho mình một phần thật ngon nha!',thanks:'Đúng vị mình thích luôn!',patience:105},{name:'Minh',sprite:9,line:'Đói quá, trông cậy vào chủ tiệm!',thanks:'Ngon quá! Mai ghé tiếp.',patience:90},{name:'Bà Sáu',sprite:10,line:'Làm từ từ thôi con nhé.',thanks:'Khéo tay quá, con ơi!',patience:140},{name:'An',sprite:11,line:'Ăn xong mình còn đi học nè!',thanks:'Mười điểm cho chủ tiệm!',patience:85}];
export const upgrades=[{id:'tools',name:'Bộ dụng cụ xịn',desc:'Giảm một thao tác chế biến mỗi cấp.',cost:65000,max:2,icon:'✂'},{id:'fridge',name:'Tủ mát nhỏ',desc:'Nguyên liệu tươi giữ được thêm 2 ngày.',cost:80000,max:1,icon:'❄'},{id:'decor',name:'Góc phố xinh',desc:'Tăng 10% tiền boa mỗi cấp.',cost:55000,max:3,icon:'✿'},{id:'assistant',name:'Bạn phụ bếp',desc:'Thêm 30 giây kiên nhẫn cho khách.',cost:110000,max:1,icon:'♡'}];
export const money=n=>Math.round(n).toLocaleString('vi-VN')+'đ';
export const byId=id=>items.find(x=>x.id===id);
export const recipe=id=>recipes.find(x=>x.id===id);
