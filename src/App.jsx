import './App.css'
import beigeLook from '../img.jpg'
import blackLook from '../img2.jpg'
import modelCrop from '/mymodel.jpg'

const routes = {
  '/': 'home',
  '/home': 'home',
  '/styles': 'styles',
  '/profile': 'profile',
  '/cart': 'cart',
  '/design': 'design',
  '/login': 'login',
  '/signup': 'signup',
  '/products/beige-trousers': 'product',
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/styles' },
  { label: 'Styles', href: '/design' },
]

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2X']
const filterRows = ['Colors', 'Price Range', 'Collections', 'categories', 'Ratings']
const swatches = ['#dedede', '#ababab', '#1f1f1f', '#a65f2a', '#f7f7f5', '#f01515']

function App() {
  const page = routes[window.location.pathname] || 'styles'

  return (
    <main className="figma-app">
      {page !== 'login' && page !== 'signup' && <FigmaNav compact={page === 'design'} />}
      {page === 'home' && <HomePage />}
      {page === 'styles' && <StylesPage />}
      {page === 'profile' && <ProfilePage />}
      {page === 'cart' && <CartPage />}
      {page === 'design' && <DesignPage />}
      {page === 'product' && <ProductPage />}
      {page === 'login' && <AuthPage mode="login" />}
      {page === 'signup' && <AuthPage mode="signup" />}
    </main>
  )
}

function FigmaNav({ compact = false }) {
  return (
    <header className={`figma-nav ${compact ? 'compact-nav' : ''}`}>
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
      {/* <a className="brand" href="/styles">logo</a> */}
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

function HomePage() {
  const collectionItems = [
    ['White Formal Trousers', blackLook],
    ['Floral Casual Day Set', modelCrop],
    ['Formal Black Suit', beigeLook],
    ['Formal Black Suit', blackLook],
  ]
  const categories = [
    ['FORMAL', modelCrop],
    ['CASUAL', beigeLook],
    ['EVENING WEAR', blackLook],
    ['SPORTSWEAR', modelCrop],
  ]

  return (
    <section className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <h1>Design Your Elegance<br />Be Unique</h1>
          <a href="/styles">SHOP NOW...</a>
        </div>
        <img src={modelCrop} alt="Elegant fashion model" />
      </section>

      <section className="home-section collections-section">
        <div className="section-heading"><h2>COLLECTIONS 25-26</h2><a href="/styles">See All</a></div>
        <div className="home-card-grid products">
          {collectionItems.map(([name, image], index) => (
            <article key={`${name}-${index}`}>
              <img src={image} alt={name} />
              <h3>{name}</h3>
              <p>$99</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading"><h2>SHOP CATEGORIES</h2><a href="/styles">See More</a></div>
        <div className="home-card-grid categories">
          {categories.map(([name, image]) => (
            <article key={name}>
              <img src={image} alt={name} />
              <h3>{name}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>WHO WE ARE</h2>
        <p>at elegant vogue, we blend creativity with craftsmanship to create fashion that transcends trends and stands the test of time each design is meticulously crafted, ensuring the highest quality exquisite finish</p>
        <div className="about-collage">
          <img src={blackLook} alt="" />
          <img src={beigeLook} alt="" />
          <img src={modelCrop} alt="" />
          <img src={blackLook} alt="" />
        </div>
      </section>

      <footer className="site-footer">
        <div><h4>CUSTOMER SERVICE</h4><p>DELIVERY OPTION<br />PAYMENT METHODS</p></div>
        <div><h4>CALL US</h4><p>TEL:2223899998<br />TIME/ AM 8:00 - PM 10:00<br />EMAIL/SHOP@GG.COM</p></div>
        <div><h4>FOLLOW US</h4></div>
      </footer>
    </section>
  )
}

function AuthPage({ mode }) {
  const isSignup = mode === 'signup'
  const fields = isSignup
    ? [['User name', 'user'], ['phone number', 'phone'], ['Email', 'mail'], ['password', 'key'], ['confirm password', 'key']]
    : [['User name', 'user'], ['password', 'key']]

  return (
    <section className={`auth-page ${mode}`}>
      <a className="auth-logo" href="/">logo</a>
      <h1>{isSignup ? 'sign up' : 'log in'}</h1>
      <form className="auth-form">
        {fields.map(([label, icon]) => (
          <label className="auth-field" key={label}>
            <span>{label}</span>
            <input type={label.includes('password') ? 'password' : 'text'} />
            <i className={`auth-icon ${icon}`} />
          </label>
        ))}
        {!isSignup && (
          <div className="login-options">
            <label><span />remember me</label>
            <a href="/login">forget password</a>
          </div>
        )}
        <button type="button">{isSignup ? 'sign up' : 'log in'}</button>
        {isSignup && <a className="secondary-auth" href="/login">log in</a>}
      </form>
    </section>
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
