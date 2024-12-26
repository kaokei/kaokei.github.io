<template>
  <div class="drawer">
    <input id="navbar-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="navbar w-full shadow-sm">
        <div class="flex-none lg:hidden">
          <label
            for="navbar-drawer"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <NuxtLink class="btn btn-ghost" to="/">
          <img src="~/assets/image/logo.svg" alt="logo" class="h-8" />
          <span>kaokei</span>
        </NuxtLink>
        <div class="ml-auto hidden flex-none lg:block">
          <ul class="menu menu-horizontal p-0">
            <!-- Navbar menu content here -->
            <li>
              <NuxtLink external class="btn btn-ghost" to="/tool"
                >工具集</NuxtLink
              >
            </li>
            <li>
              <NuxtLink external class="btn btn-ghost" to="/game"
                >游戏集</NuxtLink
              >
            </li>
            <li>
              <NuxtLink external class="btn btn-ghost" to="/word"
                >背单词</NuxtLink
              >
            </li>
            <li>
              <NuxtLink class="btn btn-ghost" to="/about">关于</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <!-- Page content here -->
      <div><slot></slot></div>
    </div>
    <div class="drawer-side">
      <label
        for="navbar-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu min-h-full w-80 bg-white p-4">
        <!-- Sidebar content here -->
        <li>
          <NuxtLink external class="btn btn-ghost justify-start" to="/tool"
            >工具集</NuxtLink
          >
        </li>
        <li>
          <NuxtLink external class="btn btn-ghost justify-start" to="/game"
            >游戏集</NuxtLink
          >
        </li>
        <li>
          <NuxtLink external class="btn btn-ghost justify-start" to="/word"
            >背单词</NuxtLink
          >
        </li>
        <li>
          <NuxtLink class="btn btn-ghost justify-start" to="/about"
            >关于</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>
