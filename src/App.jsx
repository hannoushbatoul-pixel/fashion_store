import './App.css'
import beigeLook from '../img.jpg'
import blackLook from '../img2.jpg'
import modelCrop from '/mymodel.jpg'

const routes = {
  '/': 'styles',
  '/styles': 'styles',
  '/profile': 'profile',
  '/cart': 'cart',
  '/design': 'design',
  '/products/beige-trousers': 'product',
}

const navItems = [
  { label: 'Home', href: '/styles' },
  { label: 'Collections', href: '/cart' },
  { label: 'Styles', href: '/design' },
]

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2X']
const filterRows = ['Colors', 'Price Range', 'Collections', 'categories', 'Ratings']
const swatches = ['#dedede', '#ababab', '#1f1f1f', '#a65f2a', '#f7f7f5', '#f01515']

function App() {
  const page = routes[window.location.pathname] || 'styles'

  return (
    <main className="figma-app">
      <FigmaNav />
      {page === 'styles' && <StylesPage />}
      {page === 'profile' && <ProfilePage />}
      {page === 'cart' && <CartPage />}
      {page === 'design' && <DesignPage />}
      {page === 'product' && <ProductPage />}
    </main>
  )
}

function FigmaNav() {
  return (
    <header className="figma-nav">
      <div className="nav-left">
        <a className="hamburger" href="/styles" aria-label="menu">
          <span />
          <span />
          <span />
        </a>
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
      <a className="brand" href="/styles">logo</a>
      <div className="nav-actions">
        <a className="ai-pill" href="/design">AI</a>
        <a className="cart-pill" href="/cart">Cart</a>
        <a className="bag-pill" href="/cart" aria-label="shopping bag">
          <span />
        </a>
        <a className="user-pill" href="/profile" aria-label="profile">
          <span />
        </a>
      </div>
    </header>
  )
}

function StylesPage() {
  return (
    <section className="styles-page">
      <aside className="filters">
        <h2>Filters</h2>
        <h3>Size</h3>
        <div className="size-row compact">
          {sizes.map((size) => <button key={size}>{size}</button>)}
        </div>
        <div className="filter-block">
          <div className="filter-title">Availability <span className="chevron up" /></div>
          <label><i />Availability <b>(450)</b></label>
          <label><i />Out Of Stack <b>(18)</b></label>
        </div>
        {filterRows.map((row) => (
          <div className="filter-line" key={row}>
            <span>{row}</span>
            {row === 'Collections' && <small>(+4)</small>}
            <b className="chevron right" />
          </div>
        ))}
      </aside>

      <section className="products-area">
        <p className="breadcrumb">Home / styles</p>
        <h1>PRODUCTS</h1>
        <div className="product-toolbar">
          <div className="search-box"><span />Search</div>
          <button>CASUAL</button>
          <button />
          <button />
          <button />
        </div>
        <div className="product-grid">
          <a href="/products/beige-trousers"><img src={beigeLook} alt="Beige wide leg trousers" /></a>
          <div className="missing-image"><img src={modelCrop} alt="Cream suit placeholder" /></div>
          <div className="missing-image"><img src={blackLook} alt="Black suit placeholder" /></div>
        </div>
      </section>
    </section>
  )
}

function ProfilePage() {
  return (
    <FramedPanel title="your profile" className="profile-page">
      <div className="profile-left">
        <label>Profile Picture</label>
        <div className="avatar-box"><button aria-label="edit profile picture" className="edit-icon" /></div>
        {['your name', 'phone', 'Email', 'your address'].map((item) => (
          <div className="field-row" key={item}>
            <label>{item}</label>
            <div className="line-input">{(item === 'phone' || item === 'Email') && <span className="edit-icon" />}{item === 'your address' && <b className="chevron down" />}</div>
          </div>
        ))}
      </div>
      <div className="profile-divider" />
      <div className="profile-right">
        {['currency', 'language', 'Notifications'].map((item) => (
          <div className="select-row" key={item}>
            <label>{item}</label>
            <div><span className="chevron down" /></div>
          </div>
        ))}
        <a href="/styles" className="logout"><span aria-hidden="true" />Log out</a>
      </div>
    </FramedPanel>
  )
}

function CartPage() {
  const items = [
    ['white sports t-shirt', '15$'],
    ['Wedding Dress', '250$'],
  ]

  return (
    <FramedPanel title="your cart" className="cart-page">
      <div className="cart-left">
        <h2>Cart Contents</h2>
        {items.map(([name, price]) => (
          <div className="cart-item" key={name}>
            <div />
            <section><h3>{name}</h3><p>{price}</p></section>
          </div>
        ))}
      </div>
      <div className="profile-divider" />
      <div className="cart-right">
        <h2>Total Purchases</h2>
        <div className="coupon-row"><button>Done</button><span>discount coupon</span></div>
        <dl>
          <dt>Price</dt><dd>396.00 $</dd>
          <dt>Discount Percentage</dt><dd>0.00 $</dd>
          <dt>Price After Discount</dt><dd>396.00 $</dd>
          <dt>VAT Amount</dt><dd>0.00 $</dd>
        </dl>
        <div className="invoice"><span>Invoice Total</span><b>396.00$</b></div>
      </div>
      <button className="payment-btn">Complete the payment process</button>
    </FramedPanel>
  )
}

function DesignPage() {
  return (
    <section className="design-page">
      <h1>CREAT YOUR DESIGN</h1>
      <div className="design-grid">
        <OptionColumn title="STYLE" first="CASUAL" />
        <OptionColumn title="CATEGORIES" />
        <OptionColumn title="COLORS" />
        <OptionColumn title="SIZE" />
        <div className="design-preview" />
        <div className="design-actions">
          <button>ADD TO CART</button>
          <button>REGENERATE</button>
        </div>
      </div>
    </section>
  )
}

function OptionColumn({ title, first }) {
  return (
    <div className="option-column">
      <h2>{title}</h2>
      {[0, 1, 2, 3].map((item) => <button key={item}>{item === 0 ? first : ''}</button>)}
    </div>
  )
}

function ProductPage() {
  return (
    <section className="product-page">
      <div className="product-photo-wrap">
        <img src={beigeLook} alt="Beige wide-leg trousers" />
        <div className="dots"><span /><span /><span /></div>
      </div>
      <article className="product-info">
        <p className="price">$99</p>
        <div className="stars"><span aria-label="3 out of 5 stars" /><i /><b>(50)</b></div>
        <p className="description">Comfortable, Formal, Wide-Leg Trousers</p>
        <label>Color</label>
        <div className="swatches">{swatches.map((color) => <button key={color} style={{ background: color }} />)}</div>
        <label>Size</label>
        <div className="size-row">
          {sizes.map((size) => <button key={size}>{size}</button>)}
        </div>
        <p className="guide">FIND YOUR SIZE | MEASUREMENT GUIDE</p>
        <button className="add-cart">ADD TO CART</button>
      </article>
    </section>
  )
}

function FramedPanel({ title, className, children }) {
  return (
    <section className={`framed-page ${className}`}>
      <h1>{title}</h1>
      <div className="panel-frame">{children}</div>
    </section>
  )
}

export default App
