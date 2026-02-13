<template>
    <div>
        <div class="nv-navbar">
            <ul class="nav">
                <li><router-link :to="{ name: 'coffees' }">Coffees</router-link></li>
                <li><router-link :to="{ name: 'menus' }">Menus</router-link></li>
                <li><router-link :to="{ name: 'login' }">Login</router-link></li>
            </ul>
            <div class="clearfix"></div>
        </div>
    </div>
</template>

<script>
export default {
    // Options API
}
</script>

<style scoped>
/* ===== Sage Pill Navbar (Earth Tone) ===== */
.nv-navbar {
  background: linear-gradient(90deg, #5f7f6e, #6b8f7a);
  width: fit-content;
  margin: 16px auto;
  padding: 8px 12px;
  border-radius: 999px;
  box-shadow: 0 6px 18px rgba(79, 111, 96, 0.35);
  position: sticky;
  top: 12px;
  z-index: 1000;
}

/* Nav list */
.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Nav item */
.nv-navbar .nav li {
  margin: 0;
}

/* Link (เมนูแบบ pill) */
.nv-navbar .nav li a {
  display: inline-block;
  padding: 8px 16px;
  text-decoration: none;
  color: #f4f8f6;
  font-weight: 600;
  letter-spacing: 0.4px;
  border-radius: 999px;
  transition: all 0.25s ease;
}

/* Hover */
.nv-navbar .nav li a:hover {
  background-color: rgba(255, 255, 255, 0.18);
  color: #ffffff;
}

/* Active route */
.nv-navbar .nav li a.router-link-active {
  background-color: #dfe8e2;   /* accent-soft */
  color: #4f6f60;              /* accent-dark */
  box-shadow: 0 3px 8px rgba(79, 111, 96, 0.25);
}

/* Responsive */
@media (max-width: 600px) {
  .nv-navbar {
    padding: 6px 10px;
  }

  .nv-navbar .nav li a {
    padding: 6px 12px;
    font-size: 14px;
  }
}
</style>


