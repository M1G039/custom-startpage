/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"hgQhsrteSk7RDJd8","label":"Media","bookmarks":[{"id":"625PzmqppnNuFA9R","label":"MangaDex","url":"https://mangadex.org/"},{"id":"tNKXmVqOsxdwxJkC","label":"Crunchyroll","url":"https://www.crunchyroll.com/"},{"id":"FzGkND8iAwEKf70f","label":"Nyaa","url":"nyaa.si"}]},{"id":"UuZXn8xFWfIRDnIq","label":"Faculdade","bookmarks":[{"id":"HqwJBiddyEMkLqhq","label":"Sigarra","url":"fe.up.pt"},{"id":"ve8vQCknrliP9MmB","label":"Moodle","url":"moodle.up.pt"}]},{"id":"PvCVSKqFt53pyfOn","label":"Japonês","bookmarks":[{"id":"RTPYYWtwrR8zvSJ3","label":"Takoboto","url":"https://takoboto.jp/"},{"id":"yNCZlXDFSCqcUeJX","label":"Jisho","url":"jisho.org"},{"id":"BiPYmkBWatYYURzR","label":"Renshuu","url":"renshuu.org"},{"id":"MFgqG8ytvYs5jFUb","label":"E-reader","url":"https://reader.ttsu.app/manage"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
