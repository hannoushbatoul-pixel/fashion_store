import { useEffect, useMemo, useState } from 'react'
import './App.css'
import beigeLook from '../img.jpg'
import blackLook from '../img2.jpg'
import modelCrop from '/mymodel.jpg'
import partylook from '../photo_٢٠٢٦-٠٤-٠٩_٢٣-٠٥-٠١.jpg'
import abaylook from '../photo_٢٠٢٦-٠٤-٠٩_٢٢-٥٥-٢٢.jpg'
import casuallook from '../photo_٢٠٢٦-٠٤-٠٩_٢٣-٠٤-٥٧.jpg'
import white from '../photo_٢٠٢٦-٠٤-٠٩_٢٢-٥٥-٢٣.jpg'
import evningsuit from '../photo_٢٠٢٦-٠٤-٠٩_٢٣-٠٥-٠١ (2).jpg'
import sport from '../sport.jpg'
import wear from '../photo_٢٠٢٦-٠٤-٠٩_٢٣-٠٥-٠٢.jpg'
import casual from '../photo_٢٠٢٦-٠٤-٠٩_٢٣-٠٤-٥٦.jpg'







import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import {
  addToCart,
  addProductReview,
  cancelOrder,
  changePassword,
  clearCart,
  createOrder,
  fetchBestsellers,
  fetchCart,
  fetchCategories,
  fetchCategoryById,
  fetchCategoryProducts,
  fetchLatestProducts,
  fetchOrderById,
  fetchOrders,
  fetchProductById,
  fetchProducts,
  fetchProfile,
  fetchSimilarProducts,
  getApiError,
  getImage,
  getCurrentUser,
  loginUser,
  logoutUser,
  removeCartItem,
  registerUser,
  searchProducts,
  updateCartItem,
  updateProfile,
} from './services'

const routes = {
  '/': 'home',
  '/home': 'home',
  '/styles': 'styles',
  '/profile': 'profile',
  '/cart': 'cart',
  '/design': 'design',
  '/orders': 'orders',
  '/login': 'login',
  '/signup': 'signup',
  '/products/beige-trousers': 'product',
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/styles' },
  { label: 'Styles', href: '/#style-section' },
]

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2X']
const swatches = ['#dedede', '#ababab', '#1f1f1f', '#a65f2a', '#f7f7f5', '#f01515']

function useApiData(loader, fallback, deps = []) {
  const [data, setData] = useState(fallback)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    loader()
      .then((response) => {
        if (!active) return
        const payload = response?.data?.data ?? response?.data ?? fallback
        setData(Array.isArray(fallback) && !Array.isArray(payload) ? fallback : payload)
      })
      .catch(() => {
        if (!active) return
        setData(fallback)
        setError('تعذر تحميل البيانات من الخادم.')
      })

    return () => {
      active = false
    }
    // The caller owns deps so pages can refetch by route/search state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, error }
}

function toProductCard(product, fallbackImage) {
  const variants = product?.variants || product?.product_variants || []
  const firstVariant = variants[0] || {}
  return {
    id: product?.id,
    name: product?.name || product?.title || 'Elegant Vogue Look',
    description: product?.description || product?.short_description || 'Premium Quality Item',
    image: product?.image_url || product?.image || product?.thumbnail || fallbackImage,
    price: product?.price || firstVariant?.price || '$99.00',
    rating: product?.rating || product?.average_rating,
    variantId: product?.default_variant_id || product?.variant_id || firstVariant?.id || product?.id,
  }
}

function fillProductRows(products) {
  const fallbackImages = [beigeLook, modelCrop, blackLook, white, casual, sport, wear, evningsuit, casuallook]
  const baseProducts = products.length ? products : fallbackImages.map((image, index) => ({
    id: `sample-${index + 1}`,
    image,
    name: ['Formal Trousers', 'Cream Suit', 'Black Suit', 'White Formal Set', 'Casual Dress', 'Sport Wear', 'Evening Wear', 'Tailored Suit', 'Floral Set'][index],
    description: 'Premium Quality Item',
    price: '$99.00',
  }))

  return Array.from({ length: Math.max(9, baseProducts.length) }, (_, index) => {
    const product = baseProducts[index % baseProducts.length]
    return {
      ...product,
      id: product.id || `product-${index + 1}`,
      cardId: `${product.id || product.name}-${index}`,
      image: product.image || fallbackImages[index % fallbackImages.length],
      description: product.description || 'Premium Quality Item',
      price: product.price || '$99.00',
    }
  })
}

function App() {
  const path = window.location.pathname
  const page = path.startsWith('/products/') ? 'product' : routes[path] || 'styles'
  const [snackbar, setSnackbar] = useState(null)
  const notify = (message, type = 'info') => setSnackbar({ message, type })
  const { data: currentUser } = useApiData(
    () => localStorage.getItem('token') ? getCurrentUser() : Promise.resolve({ data: null }),
    null,
    [],
  )

  return (
    <main className="figma-app">
      {page !== 'login' && page !== 'signup' && <FigmaNav compact={page === 'design'} currentUser={currentUser} />}
      {page === 'home' && <HomePage />}
      {page === 'styles' && <StylesPage notify={notify} />}
      {page === 'profile' && <ProfilePage notify={notify} />}
      {page === 'cart' && <CartPage notify={notify} />}
      {page === 'orders' && <OrdersPage notify={notify} />}
      {page === 'design' && <DesignPage notify={notify} />}
      {page === 'product' && <ProductPage notify={notify} />}
      {page === 'login' && <AuthPage mode="login" notify={notify} />}
      {page === 'signup' && <AuthPage mode="signup" notify={notify} />}
      <Snackbar notice={snackbar} onClose={() => setSnackbar(null)} />
    </main>
  )
}

function Snackbar({ notice, onClose }) {
  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(onClose, 3500)
    return () => window.clearTimeout(timer)
  }, [notice, onClose])

  if (!notice) return null

  return (
    <div className={`snackbar ${notice.type}`} role="status">
      <span>{notice.message}</span>
      <button type="button" onClick={onClose} aria-label="Close">x</button>
    </div>
  )
}

function FigmaNav({ compact = false, currentUser }) {
  const userLabel = currentUser?.username || currentUser?.name || currentUser?.email
  const goToStyles = (event) => {
    const href = event.currentTarget.getAttribute('href')
    if (href !== '/#style-section') return

    if (window.location.pathname === '/' || window.location.pathname === '/home') {
      event.preventDefault()
      document.getElementById('style-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className={`figma-nav ${compact ? 'compact-nav' : ''}`}>
      <div className="nav-left">
        <a className="hamburger" href="/styles" aria-label="menu">
          <span />
          <span />
          <span />
        </a>
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={goToStyles}>
            {item.label}
          </a>
        ))}
      </div>
      {/* <a className="brand" href="/styles">logo</a> */}
      <div className="nav-actions">
        <a className="user-pill" href="/profile" aria-label="profile">
          <span />
        </a>
        
        <a className="ai-pill" href="/design">AI</a>

                <a className="cart-pill" href="/cart">Cart</a>
          <span />
        <a className="auth-link" href="/orders">Orders</a>
        {userLabel ? (
          <a className="auth-link signup-link" href="/profile">{userLabel}</a>
        ) : (
          <>
            <a className="auth-link" href="/login">Log in</a>
            <a className="auth-link signup-link" href="/signup">Sign up</a>
          </>
        )}
        
      
      
      </div>
    </header>
  )
}

function HomePage() {
  const [activeStyle, setActiveStyle] = useState('formal')
  const fallbackCollections = [
    { name:'White Formal Trousers', image:white },
    { name:'Floral Casual Day Set', image: casuallook },
    { name:'evining white suit', image:evningsuit },
    { name:'Formal Black Suit', image: blackLook },
  ];
  const fallbackCategories = [
   { name:'formal', image:beigeLook },
    { name:'casual', image: casual },
    { name:'evining wear', image:wear },
    { name:'sportwerar', image: sport },
  ]
  const { data: latestProducts } = useApiData(fetchLatestProducts, [], [])
  const { data: categories } = useApiData(fetchCategories, fallbackCategories, [])
  const collectionItems = latestProducts.length
    ? latestProducts.slice(0, 4).map((item, index) => toProductCard(item, fallbackCollections[index]?.image || beigeLook))
    : fallbackCollections

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
          {collectionItems.map(({ name,image }, index) => (
            <article key={`${name}-${index}`}>
              <img src={image} alt={name} />
              <h3>{name}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section" id="style-section">
        <div className="section-heading"><h2>Styles</h2><a href="/styles">See More</a></div>
        <div className="home-card-grid categories">
                    {categories.slice(0, 4).map(({ name, image_url, image },) => (

            <article
              className={activeStyle === name?.toLowerCase() ? 'active-category' : ''}
              key={name}
              onClick={() => setActiveStyle(name?.toLowerCase())}
            >
              <img src={image_url || image || beigeLook} alt={name} />
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
          <img src={casuallook} alt="" />
          <img src={partylook} alt="" />
          <img src={abaylook} alt="" />
        </div>
      </section>

      <footer className="site-footer">
        <div><h4>CUSTOMER SERVICE</h4><p>DELIVERY OPTION<br />PAYMENT METHODS</p></div>
        <div><h4>CALL US</h4><p>TEL:2223899998<br />TIME/ AM 8:00 - PM 10:00<br />EMAIL/SHOP@GG.COM</p></div>
        <div><h4>FOLLOW US</h4>
        <div className="flex  flex-col gap-6 items-start">
    <a 
      href="https://facebook.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className=" mb-4 text-white hover:text-gray-300 transition-colors"
    >
              <FaFacebookF size={20} />
              <span className='text-xs'>fashion-store</span>
    </a>
    
    <a 
      href="https://instagram.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className=" text-white hover:text-gray-300 transition-colors"
    >
              <FaInstagram size={20} />
                            <span className='text-xs'>fashion-store</span>

    </a>
  </div>
        </div>
      </footer>
    </section>
  )
}

function AuthPage({ mode, notify }) {
  const isSignup = mode === 'signup'
  const [form, setForm] = useState({})
  const [error, setError] = useState('')
  const fields = isSignup
    ? [['User name', 'user'], ['phone number', 'phone'], ['Email', 'mail'], ['password', 'key'], ['confirm password', 'key']]
    : [['User name', 'user'], ['password', 'key']]

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      const action = isSignup ? registerUser : loginUser
      const apiPayload = {
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
        password_confirmation: form.password_confirmation,
      }
      const response = await action(apiPayload)
      const token = response?.data?.token || response?.data?.access_token
      if (token) localStorage.setItem('token', token)
      notify(isSignup ? 'تم إنشاء الحساب بنجاح.' : 'تم تسجيل الدخول بنجاح.', 'success')
      window.location.href = '/styles'
    } catch (error) {
      const message = getApiError(error, 'تعذر إكمال العملية. يرجى التحقق من البيانات.')
      setError(message)
      notify(message, 'error')
    }
  }

  return (
    <section className={`auth-page ${mode}`}>
      <a className="auth-logo" href="/"> <img src="/تنزيل.png" alt="Logo" /></a>
      <h1>{isSignup ? 'sign up' : 'log in'}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {fields.map(([label, icon]) => (
          <label className="auth-field" key={label}>
            <span>{label}</span>
            <input
              type={label.includes('password') ? 'password' : 'text'}
              onChange={(event) => setForm({ ...form, [authFieldName(label)]: event.target.value })}
            />
            <i className={`auth-icon ${icon}`} />
          </label>
        ))}
        {!isSignup && (
          <div className="login-options">
            <label><span />remember me</label>
            <a href="/login">forget password</a>
          </div>
        )}
        {error && <p className="form-error">{error}</p>}
        <button className="primary-auth" type="submit">{isSignup ? 'sign up' : 'log in'}</button>
        {isSignup && <a className="secondary-auth" href="/login">log in</a>}
        {!isSignup && <a className="auth-switch" href="/signup">create account</a>}
      </form>
    </section>
  )
}

function StylesPage({ notify }) {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({})
  const [categoryId, setCategoryId] = useState('')
  const { data: products } = useApiData(
    () => {
      if (query) return searchProducts(query)
      if (filters.bestsellers) return fetchBestsellers()
      if (categoryId) return fetchCategoryProducts(categoryId)
      return fetchProducts(filters)
    },
    [],
    [query, filters, categoryId],
  )
  const { data: categories } = useApiData(fetchCategories, [], [])
  const { data: selectedCategory } = useApiData(
    () => categoryId ? fetchCategoryById(categoryId) : Promise.resolve({ data: null }),
    null,
    [categoryId],
  )
  const productCards = products.length
    ? products.slice(0, 6).map((product, index) => toProductCard(product, [beigeLook, modelCrop, blackLook][index % 3]))
    : [
      { id: 'beige-trousers', image: beigeLook, name: 'Beige wide leg trousers', description: 'Premium Quality Item', price: '$99.00' },
      { id: 'cream-suit', image: modelCrop, name: 'Cream suit placeholder', description: 'Premium Quality Item', price: '$99.00' },
      { id: 'black-suit', image: blackLook, name: 'Black suit placeholder', description: 'Premium Quality Item', price: '$99.00' },
    ]
  const visibleProducts = fillProductRows(productCards)

  return (
    <section className="styles-page">
      <aside className="filters">
        <h2>Filters</h2>
        <h3>Size</h3>
        <div className="size-row compact">
          {sizes.map((size) => (
            <button type="button" className={filters.size === size ? 'active' : ''} key={size} onClick={() => setFilters({ ...filters, size })}>{size}</button>
          ))}
        </div>
        <div className="filter-block">
          <div className="filter-title">Availability <span className="chevron up" /></div>
          <button type="button" className="filter-choice" onClick={() => setFilters({ ...filters, availability: 'in_stock' })}><i />Availability</button>
          <button type="button" className="filter-choice" onClick={() => setFilters({ ...filters, availability: 'out_of_stock' })}><i />Out Of Stock</button>
        </div>
        <div className="filter-line"><span>Colors</span><div className="mini-swatches">{swatches.map((color) => <button type="button" aria-label={color} key={color} style={{ background: color }} onClick={() => setFilters({ ...filters, color })} />)}</div></div>
        <div className="filter-line"><span>Price Range</span><button type="button" onClick={() => setFilters({ ...filters, min_price: 0, max_price: 100 })}>0-100</button></div>
        <div className="filter-line"><span>Collections</span><button type="button" onClick={() => setFilters({ ...filters, sort_by: 'created_at', order: 'desc' })}>Latest</button></div>
        <div className="filter-line"><span>categories</span><select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}><option value="">All</option>{categories.map((category) => <option value={category.id} key={category.id || category.name}>{category.name}</option>)}</select></div>
        <div className="filter-line"><span>Ratings</span><button type="button" onClick={() => setFilters({ sort_by: 'rating', order: 'desc' })}>Top</button></div>
        <button type="button" className="filter-reset" onClick={() => { setFilters({}); setCategoryId(''); setQuery(''); notify('تمت إعادة ضبط الفلاتر.', 'info') }}>Reset</button>
      </aside>

      <section className="products-area">
        <p className="breadcrumb">Home / styles</p>
        <h1>PRODUCTS</h1>
        {selectedCategory && (
          <article className="category-summary">
            <div>
              <span>Selected Category</span>
              <h2>{selectedCategory.name || selectedCategory.title}</h2>
            </div>
            {selectedCategory.description && <p>{selectedCategory.description}</p>}
          </article>
        )}
        <div className="product-toolbar">
          <label className="search-box"><span /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" /></label>
          <button type="button" onClick={() => setFilters({ ...filters, style: 'casual' })}>CASUAL</button>
          <button type="button" onClick={() => setFilters({ sort_by: 'rating', order: 'desc' })}>TOP</button>
          <button type="button" onClick={() => setFilters({ bestsellers: true })}>BEST</button>
          <button type="button" onClick={() => setFilters({ sort_by: 'created_at', order: 'desc' })}>NEW</button>
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard product={product} key={product.cardId || product.id || product.name} />
          ))}
        </div>
      </section>
    </section>
  )
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <a href={`/products/${product.id || 'beige-trousers'}`} aria-label={`View ${product.name}`}>
        <img src={product.image} alt={product.name} />
      </a>
      <h3>{product.name}</h3>
      <p>{product.description || 'Premium Quality Item'}</p>
      <b>{formatPrice(product.price)}</b>
    </article>
  )
}

function formatPrice(price) {
  if (!price) return '$99.00'
  return String(price).includes('$') ? price : `$${price}`
}

function ProfilePage({ notify }) {
  const { data: profile } = useApiData(fetchProfile, {}, [])
  const [draft, setDraft] = useState({})
  const [passwords, setPasswords] = useState({})
  const currentProfile = { ...profile, ...draft }
  const saveProfile = async () => {
    try {
      await updateProfile({
        username: currentProfile.username || currentProfile.name || '',
        phone: currentProfile.phone || '',
        email: currentProfile.email || '',
        address: currentProfile.address || '',
        profile_picture: currentProfile.profile_picture || '',
      })
      notify('تم حفظ بيانات البروفايل.', 'success')
    } catch (error) {
      notify(getApiError(error, 'تعذر حفظ بيانات البروفايل.'), 'error')
    }
  }
  const updatePassword = async (event) => {
    event.preventDefault()
    try {
      await changePassword(passwords)
      setPasswords({})
      notify('تم تغيير كلمة المرور.', 'success')
    } catch (error) {
      notify(getApiError(error, 'تعذر تغيير كلمة المرور.'), 'error')
    }
  }
  const signOut = async (event) => {
    event.preventDefault()
    try {
      await logoutUser()
      notify('تم تسجيل الخروج.', 'success')
    } catch (error) {
      notify(getApiError(error, 'تم حذف الجلسة محلياً، لكن طلب الخروج فشل.'), 'error')
    } finally {
      localStorage.removeItem('token')
      window.location.href = '/styles'
    }
  }
  const fields = [
    ['your name', 'username'],
    ['phone', 'phone'],
    ['Email', 'email'],
    ['your address', 'address'],
  ]

  return (
    <FramedPanel title="your profile" className="profile-page">
      <div className="profile-left">
        <label>Profile Picture</label>
        <div className="avatar-box"><button aria-label="edit profile picture" className="edit-icon" /></div>
        {fields.map(([label, key]) => (
          <div className="field-row" key={key}>
            <label>{label}</label>
            <input
              className="line-input"
              value={currentProfile[key] || ''}
              onBlur={saveProfile}
              onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
            />
          </div>
        ))}
      </div>
      <div className="profile-divider" />
      <div className="profile-right">
        <form className="password-form" onSubmit={updatePassword}>
          <input placeholder="current password" type="password" value={passwords.current_password || ''} onChange={(event) => setPasswords({ ...passwords, current_password: event.target.value })} />
          <input placeholder="new password" type="password" value={passwords.new_password || ''} onChange={(event) => setPasswords({ ...passwords, new_password: event.target.value })} />
          <input placeholder="confirm new password" type="password" value={passwords.new_password_confirmation || ''} onChange={(event) => setPasswords({ ...passwords, new_password_confirmation: event.target.value })} />
          <button type="submit">Change Password</button>
        </form>
        <a href="/orders" className="orders-link">My Orders</a>
        <a href="/styles" className="logout" onClick={signOut}><span aria-hidden="true" />Log out</a>
      </div>
    </FramedPanel>
  )
}

function CartPage({ notify }) {
  const [refreshKey, setRefreshKey] = useState(0)
  const [checkoutForm, setCheckoutForm] = useState({ shipping_address: '', payment_method: 'cash' })
  const { data: cart } = useApiData(fetchCart, { items: [], total: 0 }, [refreshKey])
  const cartItems = cart?.items || cart?.cart_items || []
  const items = cartItems.map((item) => ({
    id: item.id,
    name: item.product?.name || item.name || item.product_name || 'Cart item',
    price: item.total || item.price || item.product?.price || 0,
    quantity: item.quantity || 1,
  }))
  const total = cart?.total || cart?.invoice_total || items.reduce((sum, item) => sum + Number(item.price || 0), 0)
  const refreshCart = () => setRefreshKey((value) => value + 1)
  const changeQuantity = async (itemId, quantity) => {
    try {
      await updateCartItem(itemId, quantity)
      notify('تم تحديث كمية المنتج.', 'success')
      refreshCart()
    } catch (error) {
      notify(getApiError(error, 'تعذر تحديث كمية المنتج.'), 'error')
    }
  }
  const deleteItem = async (itemId) => {
    try {
      await removeCartItem(itemId)
      notify('تم حذف المنتج من السلة.', 'success')
      refreshCart()
    } catch (error) {
      notify(getApiError(error, 'تعذر حذف المنتج من السلة.'), 'error')
    }
  }
  const emptyCart = async () => {
    try {
      await clearCart()
      notify('تم تفريغ السلة.', 'success')
      refreshCart()
    } catch (error) {
      notify(getApiError(error, 'تعذر تفريغ السلة.'), 'error')
    }
  }
  const checkout = async () => {
    try {
      await createOrder(checkoutForm.shipping_address, checkoutForm.payment_method)
      notify('تم إنشاء الطلب بنجاح.', 'success')
      refreshCart()
    } catch (error) {
      notify(getApiError(error, 'تعذر إتمام الطلب.'), 'error')
    }
  }

  return (
    <FramedPanel title="your cart" className="cart-page">
      <div className="cart-left">
        <h2>Cart Contents</h2>
        {items.map((item) => (
          <div className="cart-item" key={item.id || item.name}>
            <div />
            <section>
              <h3>{item.name}</h3>
              <p>{item.price}$</p>
              <div className="cart-controls">
                <button type="button" onClick={() => changeQuantity(item.id, Math.max(0, item.quantity - 1))}>-</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => changeQuantity(item.id, item.quantity + 1)}>+</button>
                <button type="button" onClick={() => deleteItem(item.id)}>Remove</button>
              </div>
            </section>
          </div>
        ))}
        {!items.length && <p className="empty-state">Your cart is empty.</p>}
      </div>
      <div className="profile-divider" />
      <div className="cart-right">
        <h2>Total Purchases</h2>
        <div className="checkout-fields">
          <input value={checkoutForm.shipping_address} onChange={(event) => setCheckoutForm({ ...checkoutForm, shipping_address: event.target.value })} placeholder="shipping address" />
          <select value={checkoutForm.payment_method} onChange={(event) => setCheckoutForm({ ...checkoutForm, payment_method: event.target.value })}>
            <option value="cash">cash</option>
          </select>
        </div>
        <dl>
          <dt>Price</dt><dd>396.00 $</dd>
          <dt>Discount Percentage</dt><dd>0.00 $</dd>
          <dt>Price After Discount</dt><dd>396.00 $</dd>
          <dt>VAT Amount</dt><dd>0.00 $</dd>
        </dl>
        <div className="invoice"><span>Invoice Total</span><b>{total}$</b></div>
        <button className="clear-cart" type="button" onClick={emptyCart}>Clear Cart</button>
      </div>
      <button className="payment-btn" onClick={checkout}>Complete the payment process</button>
    </FramedPanel>
  )
}

function OrdersPage({ notify }) {
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedOrderId, setSelectedOrderId] = useState('')
  const { data: orders } = useApiData(fetchOrders, [], [refreshKey])
  const { data: selectedOrder } = useApiData(
    () => selectedOrderId ? fetchOrderById(selectedOrderId) : Promise.resolve({ data: null }),
    null,
    [selectedOrderId, refreshKey],
  )
  const cancel = async (orderId) => {
    try {
      await cancelOrder(orderId)
      notify('تم إلغاء الطلب.', 'success')
      setRefreshKey((value) => value + 1)
    } catch (error) {
      notify(getApiError(error, 'تعذر إلغاء الطلب.'), 'error')
    }
  }

  return (
    <FramedPanel title="your orders" className="orders-page">
      <div className="orders-list">
        {(orders || []).map((order) => (
          <article className="order-row" key={order.id}>
            <button type="button" onClick={() => setSelectedOrderId(order.id)}>#{order.id}</button>
            <span>{order.status || 'pending'}</span>
            <b>{order.total || order.invoice_total || 0}$</b>
            <button type="button" onClick={() => cancel(order.id)}>Cancel</button>
          </article>
        ))}
        {!(orders || []).length && <p className="empty-state">No orders yet.</p>}
      </div>
      <div className="profile-divider" />
      <div className="order-detail">
        <h2>Order Details</h2>
        {selectedOrder ? (
          <pre>{JSON.stringify(selectedOrder, null, 2)}</pre>
        ) : (
          <p className="empty-state">Select an order.</p>
        )}
      </div>
    </FramedPanel>
  )
}

function DesignPage({ notify }) {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const payload = useMemo(() => buildDesignPayload(prompt), [prompt])

  const submitPrompt = async (event) => {
    event.preventDefault()
    setIsGenerating(true)
    try {
      const generatedUrl = await getImage(prompt)
      setImageUrl((previousUrl) => {
        if (previousUrl) URL.revokeObjectURL(previousUrl)
        return generatedUrl
      })
      notify('AI design generated successfully.', 'success')
    } catch (error) {
      notify(error.message || 'Image generation failed.', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl)
    }
  }, [imageUrl])

  return (
    <section className="design-page">
      <h1>CREAT YOUR DESIGN</h1>
      <form className="design-grid" onSubmit={submitPrompt}>
        <label className="ai-prompt-box">
          <span>AI PROMPT</span>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Describe the outfit, style, category, color, size, fabric, occasion, and any details you want."
          />
        </label>
        <div className="design-preview">
          {imageUrl ? (
            <img src={imageUrl} alt="Generated fashion design" />
          ) : (
            <pre>{JSON.stringify(payload, null, 2)}</pre>
          )}
        </div>
        <div className="design-actions">
          <button type="button" onClick={() => notify('Generated AI images are not backend products yet, so they cannot be added to cart.', 'error')}>ADD TO CART</button>
          <button type="submit" disabled={isGenerating}>{isGenerating ? 'GENERATING' : 'REGENERATE'}</button>
        </div>
      </form>
      {imageUrl && <pre className="design-payload">{JSON.stringify(payload, null, 2)}</pre>}
    </section>
  )
}
function authFieldName(label) {
  const normalized = label.toLowerCase()
  if (normalized === 'user name') return 'username'
  if (normalized === 'confirm password') return 'password_confirmation'
  if (normalized === 'phone number') return 'phone'
  return normalized
}

function buildDesignPayload(prompt) {
  const lower = prompt.toLowerCase()
  const findValue = (label) => {
    const match = lower.match(new RegExp(`${label}\\s*:\\s*([^,\\n]+)`))
    return match?.[1]?.trim() || ''
  }

  return {
    prompt,
    style: findValue('style') || (lower.includes('casual') ? 'casual' : ''),
    category: findValue('category'),
    color: findValue('color'),
    size: findValue('size'),
  }
}

function ProductPage({ notify }) {
  const productId = window.location.pathname.split('/').pop()
  const { data: product } = useApiData(() => fetchProductById(productId), {}, [productId])
  const { data: similarProducts } = useApiData(() => fetchSimilarProducts(productId), [], [productId])
  const [selectedVariant, setSelectedVariant] = useState('')
  const [review, setReview] = useState({ rating: 5, comment: '' })
  const currentProduct = toProductCard(product, beigeLook)
  const variants = product?.variants || product?.product_variants || []
  const colors = variants.length ? [...new Set(variants.map((variant) => variant.color).filter(Boolean))] : swatches
  const variantSizes = variants.length ? [...new Set(variants.map((variant) => variant.size).filter(Boolean))] : sizes
  const addCurrentToCart = async () => {
    const variantId = selectedVariant || currentProduct.variantId
    try {
      await addToCart(variantId, 1)
      notify('تمت إضافة المنتج إلى السلة.', 'success')
    } catch (error) {
      notify(getApiError(error, 'تعذر إضافة المنتج إلى السلة.'), 'error')
    }
  }
  const submitReview = async (event) => {
    event.preventDefault()
    try {
      await addProductReview(productId, review)
      setReview({ rating: 5, comment: '' })
      notify('تم إرسال تقييم المنتج.', 'success')
    } catch (error) {
      notify(getApiError(error, 'تعذر إرسال التقييم.'), 'error')
    }
  }

  return (
    <section className="product-page">
      <div className="product-photo-wrap">
        <img src={currentProduct.image} alt={currentProduct.name} />
        <div className="dots"><span /><span /><span /></div>
      </div>
      <article className="product-info">
        <p className="price">${currentProduct.price || 99}</p>
        <div className="stars"><span aria-label="3 out of 5 stars" /><i /><b>({currentProduct.rating || 0})</b></div>
        <p className="description">{product?.description || 'Comfortable, Formal, Wide-Leg Trousers'}</p>
        <label>Color</label>
        <div className="swatches">{colors.map((color) => <button type="button" key={color} style={{ background: color }} onClick={() => setSelectedVariant(findVariantId(variants, { color }) || selectedVariant)} />)}</div>
        <label>Size</label>
        <div className="size-row">
          {variantSizes.map((size) => <button type="button" key={size} onClick={() => setSelectedVariant(findVariantId(variants, { size }) || selectedVariant)}>{size}</button>)}
        </div>
        <p className="guide">FIND YOUR SIZE | MEASUREMENT GUIDE</p>
        <button className="add-cart" onClick={addCurrentToCart}>ADD TO CART</button>
        <form className="review-form" onSubmit={submitReview}>
          <select value={review.rating} onChange={(event) => setReview({ ...review, rating: event.target.value })}>
            {[1, 2, 3, 4, 5].map((rating) => <option value={rating} key={rating}>{rating}</option>)}
          </select>
          <input value={review.comment} onChange={(event) => setReview({ ...review, comment: event.target.value })} placeholder="review comment" />
          <button type="submit">Review</button>
        </form>
        <div className="similar-products">
          {similarProducts.slice(0, 3).map((item, index) => {
            const card = toProductCard(item, [beigeLook, modelCrop, blackLook][index])
            return <a href={`/products/${card.id}`} key={card.id || card.name}>{card.name}</a>
          })}
        </div>
      </article>
    </section>
  )
}

function findVariantId(variants, criteria) {
  return variants.find((variant) => (
    (!criteria.color || variant.color === criteria.color) &&
    (!criteria.size || variant.size === criteria.size)
  ))?.id
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
