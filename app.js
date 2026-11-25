const $ = (id) => document.getElementById(id);
let cart = {};
let activeCategory = "All";
let toastTimer;

function money(value){ return "₹" + Math.round(value).toLocaleString("en-IN"); }
function showToast(message){
  const toast = $("toast"); toast.textContent = message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>toast.classList.remove("show"),2200);
}
function categories(){
  const names = ["All", ...new Set(MENU.map(item=>item.category))];
  $("categoryTabs").innerHTML = names.map(name=>`<button class="category-btn ${name===activeCategory?"active":""}" data-category="${name}">${name}</button>`).join("");
}
function renderMenu(){
  const query = $("searchInput").value.trim().toLowerCase();
  const items = MENU.filter(item=>(activeCategory==="All"||item.category===activeCategory) && (item.name.toLowerCase().includes(query)||item.description.toLowerCase().includes(query)));
  $("menuGrid").innerHTML = items.length ? items.map(item=>`
    <article class="food-card">
      <div class="food-image"><img src="${item.image}" alt="${item.name}" loading="lazy"><span class="food-tag">${item.tag}</span></div>
      <div class="food-info"><h3>${item.name}</h3><p>${item.description}</p>
        <div class="food-bottom"><span class="food-price">${money(item.price)}</span><button class="add-btn" data-add="${item.id}">+ Add</button></div>
      </div>
    </article>`).join("") : `<p class="no-results">No dishes found. Try another search.</p>`;
}
function addItem(id){ cart[id]=(cart[id]||0)+1; updateCart(); showToast("Added to your cart"); }
function changeQuantity(id,delta){ cart[id]=(cart[id]||0)+delta; if(cart[id]<=0) delete cart[id]; updateCart(); }
function updateCart(){
  const entries = Object.entries(cart);
  const count = entries.reduce((sum,[,qty])=>sum+qty,0);
  const subtotal = entries.reduce((sum,[id,qty])=>sum+MENU.find(item=>item.id===Number(id)).price*qty,0);
  const delivery = subtotal ? DELIVERY_FEE : 0, tax = subtotal*TAX_RATE, total=subtotal+delivery+tax;
  $("cartCount").textContent=count;
  $("cartItems").innerHTML = entries.length ? entries.map(([id,qty])=>{
    const item=MENU.find(d=>d.id===Number(id));
    return `<div class="cart-item"><div><h4>${item.name}</h4><small>${money(item.price)} each</small></div><div class="quantity"><button data-change="${id}" data-delta="-1" aria-label="Remove one">−</button><b>${qty}</b><button data-change="${id}" data-delta="1" aria-label="Add one">+</button></div></div>`;
  }).join("") : `<p class="empty-cart">Your cart is waiting for something tasty.</p>`;
  $("subtotal").textContent=money(subtotal); $("delivery").textContent=money(delivery); $("tax").textContent=money(tax); $("total").textContent=money(total);
}
function openCart(){ $("cartDrawer").classList.add("open"); $("cartOverlay").classList.add("show"); $("cartDrawer").setAttribute("aria-hidden","false"); }
function closeCart(){ $("cartDrawer").classList.remove("open"); $("cartOverlay").classList.remove("show"); $("cartDrawer").setAttribute("aria-hidden","true"); }
function openCheckout(){
  if(!Object.keys(cart).length){showToast("Add something to your cart first");return;}
  closeCart(); $("checkoutModal").classList.add("show");
}
$("categoryTabs").addEventListener("click",e=>{const btn=e.target.closest("[data-category]");if(!btn)return;activeCategory=btn.dataset.category;categories();renderMenu();});
$("menuGrid").addEventListener("click",e=>{const btn=e.target.closest("[data-add]");if(btn)addItem(Number(btn.dataset.add));});
$("searchInput").addEventListener("input",renderMenu);
$("cartItems").addEventListener("click",e=>{const btn=e.target.closest("[data-change]");if(btn)changeQuantity(Number(btn.dataset.change),Number(btn.dataset.delta));});
$("openCart").addEventListener("click",openCart); $("closeCart").addEventListener("click",closeCart); $("cartOverlay").addEventListener("click",closeCart);
$("checkoutBtn").addEventListener("click",openCheckout);
$("closeCheckout").addEventListener("click",()=>$("checkoutModal").classList.remove("show"));
$("checkoutModal").addEventListener("click",e=>{if(e.target.id==="checkoutModal")$("checkoutModal").classList.remove("show");});
$("checkoutForm").addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(e.target), orderId="SK"+Math.floor(100000+Math.random()*900000);
  const order={id:orderId,customer:data.get("customer"),phone:data.get("phone"),address:data.get("address"),items:cart,createdAt:new Date().toISOString()};
  const previous=JSON.parse(localStorage.getItem("saranKitchenOrders")||"[]");
  previous.push(order); localStorage.setItem("saranKitchenOrders",JSON.stringify(previous));
  cart={};updateCart();e.target.reset();$("checkoutModal").classList.remove("show");
  showToast("Order "+orderId+" placed! (Demo only)");
});
$("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
$("mainNav").addEventListener("click",e=>{if(e.target.tagName==="A")$("mainNav").classList.remove("open");});
$("year").textContent=new Date().getFullYear();
categories();renderMenu();updateCart();