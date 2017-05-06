import {
  $sideNav,
  $storageItem,
  $storageItemTitle
} from './selectors'

export default (client) => {
  return {
    sideNav: {
      waitForVisible () {
        return client.waitForVisible($sideNav)
      }
    },
    storageItem: {
      count () {
        return client.$($sideNav).$$($storageItem).then(arr => arr.length)
      },
      titleAtIndex (i) {
        return client
          .$(`${$sideNav} ${$storageItem}:nth-child(${i + 1}) ${$storageItemTitle}`)
          .getText()
      }
    }
  }
}
