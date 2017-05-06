import test from 'ava'
import {Application} from 'spectron'
import path from 'path'
import initHelpers from './helpers'

test.beforeEach(async t => {
  const boostnotePath = ((platform) => {
    switch (platform) {
      case 'darwin':
        return path.join('..', '..', 'dist', 'Boostnote-darwin-x64', 'Boostnote.app', 'Contents', 'MacOS', 'Boostnote')
      case 'linux':
        return path.join('..', '..', 'dist', 'Boostnote-linux-x64', 'Boostnote')
    }
  })(process.platform)
  t.context.app = new Application({
    path: boostnotePath
  })

  await t.context.app.start()
  t.context.helpers = initHelpers(t.context.app.client)
})

test.afterEach.always(async t => {
  await t.context.app.stop()
})

test('App starts', async t => {
  const app = t.context.app
  await app.client.waitUntilWindowLoaded()

  const win = app.browserWindow
  t.is(await app.client.getWindowCount(), 1)
  t.false(await win.isMinimized())
  t.false(await win.isDevToolsOpened())
  t.true(await win.isVisible())
  t.true(await win.isFocused())

  const {width, height} = await win.getBounds()
  t.true(width > 0)
  t.true(height > 0)
})

test('SideNav starts out with 1 StorageItem with the title of "My Storage"', async t => {
  const { helpers, app } = t.context
  await app.client.waitUntilWindowLoaded()
  t.true(await helpers.sideNav.waitForVisible())
  t.is(
    (await helpers.storageItem.count()),
    1,
    'There should be 1 StorageItem in the SideNav by default'
  )
  t.is(
    (await helpers.storageItem.titleAtIndex(0)),
    'My Storage',
    'The default StorageItem has a title of "My Storage"'
  )
})
