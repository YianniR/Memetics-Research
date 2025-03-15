/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => PasteLinkPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian5 = require("obsidian");

// src/settings/defaults.ts
var DEFAULT_SETTINGS = {
  overridePasteHandler: true,
  fetchPageTitle: false,
  fetchPageTitleTimeout: 5e3,
  pageTitleRegexes: []
};

// src/settings/setting-tab.ts
var import_obsidian2 = require("obsidian");

// src/settings/regex.ts
var import_obsidian = require("obsidian");

// src/utils/array.ts
var moveElementUp = (array, index) => {
  if (array[index - 1] === void 0)
    return;
  [array[index], array[index - 1]] = [array[index - 1], array[index]];
};
var moveElementDown = (array, index) => {
  if (array[index + 1] === void 0)
    return;
  [array[index], array[index + 1]] = [array[index + 1], array[index]];
};

// src/settings/constants.ts
var CLASS_NAMES = {
  regexInput: "paste-link-regex-input",
  regexMoveButton: "paste-link-regex-move-button",
  regexInfoEl: "paste-link-regex-info-el",
  regexDeleteButton: "paste-link-regex-delete-button"
};

// src/settings/regex.ts
var RegexSetting = class extends import_obsidian.Setting {
  constructor(plugin, settingTab, containerEl, regexes, index) {
    super(containerEl);
    this.addText(
      (cb) => cb.setValue(regexes[0]).setPlaceholder("Page regex").onChange(async (value) => {
        plugin.settings.pageTitleRegexes[index][0] = value;
        await plugin.saveSettings();
      }).inputEl.addClass(CLASS_NAMES.regexInput)
    ).addText(
      (cb) => cb.setValue(regexes[1]).setPlaceholder("Title regex").onChange(async (value) => {
        plugin.settings.pageTitleRegexes[index][1] = value;
        await plugin.saveSettings();
      }).inputEl.addClass(CLASS_NAMES.regexInput)
    ).addExtraButton(
      (cb) => cb.setIcon("move-up").setDisabled(index === 0).onClick(async () => {
        moveElementUp(plugin.settings.pageTitleRegexes, index);
        await plugin.saveSettings();
        settingTab.display();
      }).extraSettingsEl.addClass(CLASS_NAMES.regexMoveButton)
    ).addExtraButton(
      (cb) => cb.setIcon("move-down").setDisabled(
        index === plugin.settings.pageTitleRegexes.length - 1
      ).onClick(async () => {
        moveElementDown(
          plugin.settings.pageTitleRegexes,
          index
        );
        await plugin.saveSettings();
        settingTab.display();
      }).extraSettingsEl.addClass(CLASS_NAMES.regexMoveButton)
    ).addExtraButton(
      (cb) => cb.setIcon("trash-2").onClick(async () => {
        plugin.settings.pageTitleRegexes.splice(index, 1);
        await plugin.saveSettings();
        settingTab.display();
      }).extraSettingsEl.addClass(CLASS_NAMES.regexDeleteButton)
    );
    this.infoEl.addClass(CLASS_NAMES.regexInfoEl);
    return this;
  }
};

// src/settings/setting-tab.ts
var PasteLinkPluginSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    this.containerEl.empty();
    new import_obsidian2.Setting(this.containerEl).setName("Override paste handler").setDesc(
      "Override Obsidian's default paste handler so that links are automatically inserted on system paste"
    ).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.overridePasteHandler).onChange(async (value) => {
        this.plugin.settings.overridePasteHandler = value;
        await this.plugin.saveSettings();
        new import_obsidian2.Notice(
          "Paste handler settings changed. Restart Obsidian."
        );
      })
    );
    new import_obsidian2.Setting(this.containerEl).setName("Fetch page titles on paste").setDesc(
      "Attempt to fetch page titles from HTTP URLs on paste when paste handler is overridden"
    ).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.fetchPageTitle).onChange(async (value) => {
        this.plugin.settings.fetchPageTitle = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(this.containerEl).setName("Fetch page timeout").setDesc(
      "How many milliseconds to wait to fetch page titles before timing out"
    ).addText(
      (cb) => cb.setValue(
        this.plugin.settings.fetchPageTitleTimeout.toString()
      ).onChange(async (value) => {
        const asNumber = Number(value);
        if (isNaN(asNumber) || asNumber < 0)
          return;
        this.plugin.settings.fetchPageTitleTimeout = asNumber;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(this.containerEl).setName("Page title regexes").setDesc(
      "Regular expressions used to clean page titles before pasting (see documentation)"
    ).setHeading();
    this.plugin.settings.pageTitleRegexes.forEach(
      (regexes, index) => new RegexSetting(
        this.plugin,
        this,
        this.containerEl,
        regexes,
        index
      )
    );
    new import_obsidian2.Setting(this.containerEl).addExtraButton(
      (cb) => cb.setIcon("circle-plus").onClick(async () => {
        this.plugin.settings.pageTitleRegexes.push([]);
        await this.plugin.saveSettings();
        this.display();
      })
    );
  }
};

// src/try-fetch-title.ts
var import_obsidian4 = require("obsidian");

// src/url-handlers.ts
var import_obsidian3 = require("obsidian");
var specialHandlers = {
  // reddit posts
  ["^https?://(?:www\\.)?(?:old\\.)?reddit\\.com/r/[^/]+/comments/[^/]+/?.*"]: async (url) => {
    const response = await (0, import_obsidian3.requestUrl)(
      url.href.replace(/(\?|$)/, ".json$1")
    );
    return response.json[0].data.children[0].data.title;
  },
  // subreddits
  ["^https?://(?:www\\.)?(?:old\\.)?reddit\\.com/r/[^/]+/?.*"]: async (url) => {
    const response = await (0, import_obsidian3.requestUrl)(
      url.href.replace(/(\?|$)/, "/about.json$1")
    );
    return response.json.data.title;
  }
};
var getSpecialUrlHandler = (url) => {
  var _a;
  return (_a = Object.entries(specialHandlers).find(
    ([regex]) => new RegExp(regex).test(url.href)
  )) == null ? void 0 : _a[1];
};
var defaultUrlHandler = async (url) => {
  const response = await (0, import_obsidian3.requestUrl)({
    url: url.href,
    headers: {
      Accept: "text/html",
      // pretend to be desktop chrome to increase odds of getting a full title
      "User-Agent": `Mozilla/5.0 (${import_obsidian3.Platform.isMacOS ? "Macintosh; Intel Mac OS X 10_15_7" : import_obsidian3.Platform.isWin ? "Windows NT 10.0; Win64; x64" : "X11; Linux x86_64"}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36`
    }
  });
  return new DOMParser().parseFromString(response.text, "text/html").title;
};

// src/utils/clean-title.ts
var cleanTitle = (rawTitle, regex) => {
  var _a, _b;
  return ((_b = (_a = rawTitle.match(new RegExp(regex))) == null ? void 0 : _a[1]) == null ? void 0 : _b.trim()) || rawTitle.trim();
};
var clean_title_default = cleanTitle;

// src/try-fetch-title.ts
var tryFetchTitle = async (url, regexes) => {
  var _a;
  if (!["http:", "https:"].includes(url.protocol))
    return;
  new import_obsidian4.Notice(`Attempting to fetch title from ${url.href}`);
  let title;
  const handler = getSpecialUrlHandler(url);
  if (handler) {
    try {
      title = await handler(url);
    } catch (_) {
    }
  }
  title != null ? title : title = await defaultUrlHandler(url);
  const regex = ((_a = regexes.find(
    ([pageRegex]) => new RegExp(pageRegex).test(url.href)
  )) == null ? void 0 : _a[1]) || "";
  return clean_title_default(title, regex);
};
var try_fetch_title_default = tryFetchTitle;

// src/utils/is-cursor-in-link.ts
var isCursorInLink = (cursor, line) => {
  const regex = /\[([^\[\]]*?)\]\(([^()]*?)\)/g;
  let match;
  while ((match = regex.exec(line)) !== null) {
    const linkStart = match.index;
    const linkEnd = match.index + match[0].length;
    if (cursor.ch > linkStart && cursor.ch < linkEnd) {
      return true;
    }
  }
  return false;
};
var is_cursor_in_link_default = isCursorInLink;

// src/utils/make-link.ts
var makeLink = (title, content) => {
  var _a, _b;
  const regex = /\[(.*?)\]\((.*?)\)/;
  if (regex.test(title)) {
    title = (_b = (_a = title.match(/\[(.*?)\]/)) == null ? void 0 : _a[1]) != null ? _b : "";
  }
  if (/\s/g.test(content) && !/^<.*?>$/g.test(content)) {
    content = `<${content}>`;
  }
  return `[${title}](${content})`;
};
var make_link_default = makeLink;

// src/utils/to-url.ts
var toUrl = (str) => {
  if (str.includes("\n"))
    return null;
  try {
    return new URL(str);
  } catch (e) {
    return null;
  }
};
var to_url_default = toUrl;

// src/main.ts
var _PasteLinkPlugin = class extends import_obsidian5.Plugin {
  insertIntoSelection(editor, link) {
    editor.replaceSelection(link);
    if (link.startsWith("[]")) {
      const cursor = editor.getCursor();
      cursor.ch -= link.length - 1;
      editor.setCursor(cursor);
    }
  }
  async handleUrl(editor, url, content, options = {}) {
    const { fetchPageTitle, fetchFullTitle } = {
      fetchPageTitle: this.settings.fetchPageTitle,
      fetchFullTitle: false,
      ...options
    };
    let title;
    if (fetchPageTitle && !editor.getSelection()) {
      try {
        title = await Promise.race([
          try_fetch_title_default(
            url,
            fetchFullTitle ? [] : this.settings.pageTitleRegexes
          ),
          new Promise(
            (_, reject) => setTimeout(
              () => reject(
                `Fetch page title timed out after ${this.settings.fetchPageTitleTimeout}`
              ),
              this.settings.fetchPageTitleTimeout
            )
          )
        ]);
      } catch (error) {
        console.error(
          `Failed to fetch page title for ${url.href}: ${error}`
        );
      }
    }
    title != null ? title : title = editor.getSelection();
    this.insertIntoSelection(editor, make_link_default(title, content));
  }
  onPaste(e, editor) {
    var _a, _b;
    if (e.defaultPrevented)
      return;
    const content = (_b = (_a = e.clipboardData) == null ? void 0 : _a.getData("text/plain")) != null ? _b : "";
    const url = to_url_default(content);
    if (!url)
      return;
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);
    if (is_cursor_in_link_default(cursor, line))
      return;
    e.preventDefault();
    this.handleUrl(editor, url, content);
  }
  // commands
  async pasteLink(editor) {
    const content = await navigator.clipboard.readText();
    const url = to_url_default(content);
    if (!url) {
      this.app.commands.executeCommandById("editor:insert-link");
      return;
    }
    await this.handleUrl(editor, url, content, { fetchPageTitle: false });
  }
  async pasteLinkAndFetchTitle(editor) {
    const content = await navigator.clipboard.readText();
    const url = to_url_default(content);
    if (!url) {
      new import_obsidian5.Notice(
        `Failed to convert clipboard content to URL: ${content}`
      );
      return;
    }
    await this.handleUrl(editor, url, content, { fetchPageTitle: true });
  }
  async pasteLinkAndFetchFullTitle(editor) {
    const content = await navigator.clipboard.readText();
    const url = to_url_default(content);
    if (!url) {
      new import_obsidian5.Notice(
        `Failed to convert clipboard content to URL: ${content}`
      );
      return;
    }
    await this.handleUrl(editor, url, content, {
      fetchPageTitle: true,
      fetchFullTitle: true
    });
  }
  async pasteAsPlainText(editor) {
    const content = await navigator.clipboard.readText();
    editor.replaceSelection(content);
  }
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new PasteLinkPluginSettingTab(this.app, this));
    if (this.settings.overridePasteHandler) {
      this.registerEvent(
        this.app.workspace.on("editor-paste", this.onPaste.bind(this))
      );
    }
    this.addCommand({
      id: "paste-link",
      name: "Paste Markdown link",
      editorCallback: this.pasteLink.bind(this),
      icon: _PasteLinkPlugin.icon
    });
    this.addCommand({
      id: "paste-as-plain-text",
      name: "Paste URL as plain text",
      editorCallback: this.pasteAsPlainText.bind(this),
      // set default hotkey for backwards compatibility w/ v1
      hotkeys: [
        {
          key: "v",
          modifiers: [
            "Shift",
            import_obsidian5.Platform.isMacOS || import_obsidian5.Platform.isIosApp ? "Meta" : "Ctrl"
          ]
        }
      ],
      icon: _PasteLinkPlugin.icon
    });
    this.addCommand({
      id: "paste-link-and-fetch-title",
      name: "Paste link and fetch page title",
      editorCallback: this.pasteLinkAndFetchTitle.bind(this),
      icon: _PasteLinkPlugin.icon
    });
    this.addCommand({
      id: "paste-link-and-fetch-full-title",
      name: "Paste link and fetch full page title",
      editorCallback: this.pasteLinkAndFetchFullTitle.bind(this),
      icon: _PasteLinkPlugin.icon
    });
  }
  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData()
    );
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var PasteLinkPlugin = _PasteLinkPlugin;
PasteLinkPlugin.icon = "clipboard-paste";

/* nosourcemap */