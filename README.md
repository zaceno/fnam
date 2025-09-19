# F & A M

Prototype website for F. & A. M. Sweden district.

## PagesCMS

Uses PagesCMS (https://pagescms.org) to manage content via the `.pages.yml` file.
That file determines how PagesCMS will show and store content. 

## Content

Content should be stored in the src/content folder
There are two "collection" types of content:

- Articles, which are rather simple and only have title and optional image in their frontmatter, the body is markdown for rendering
- Lodges, which has markdown for the body, but the front-matter is more complex, containing seal, contact information and working schedule (so it can be rendered in a sidebar for example)

There are also three "file" types of content:

- Menu (in meny.json), which is simply a 2-level list of links (each with a url and title)
- Front page sections (framsidan.json), where each section can have an image, some markdown, and a link to an article. This is so one could make the type of front page that we have in the demo at sahandprs.com right now – but editors can edit the sections, and add new ones, if desired.
- FAQ (faq.json) – just a list of questions (string) and answers (markdown)

Besides that, there is the images folder where any images an editor wants to use with any of the content get uploaded.

## Content loaders & collections

Astro is agnostic about where you get your content from, so one has to define "content loaders" in order to access content in the astro templates. I have defined content loaders for all the aforementioned content collections in `src/content.config.ts` (which is the astro defined special place where content loaders are supposed to be defined). 

## Templates and routes

I have defined a number of templates/routes that use the content as a reference implementation how the content is accessed and rendered. It is not pretty and I didn't try – I just tried to provide examples of all the content in use so you could more easily work on just the layout & styling.

The templates/routes are: 

- `src/pages/index.astro`: the front page. renders the front-page sections and also renders the lodges-gallery component
- `src/pages/faq.astro`: renders the faq
- `src/pages/[article].astro`: each of the articles will be rendered at /\<basepath\>/\<article-slug\>
- `src/pages/loger/[lodge].astro`: each of the lodges rendered at /\<basepath\>/loger/\<lodge-name\>

## Components in `src/partials`

All the templates use the component in `src/partials/main-layout.astro` to render their content in a complete html page.

The main layout pulls in the menu component from `src/partials/nav-menu.astro`, to make sure the nav menu is in the same place on every page. The nav menu accesses content/meny.json *directly*, and there is no content collection for the menu because that would be overkill.

Currently, due to a bug I discovered in PagesCMS (https://github.com/pages-cms/pages-cms/issues/317), we can't use references to articles in the menu. Instead each link has to explicitly set its url (without the baseurl) and title, for now. And that makes using a content collection for the menu kind of pointless. In the future I hope we can fix this up.

The component `src/partials/lodges-gallery.astro` uses the lodges content-collection to create a "gallery" of all the lodges with their seals and links to the lodge pages. It is used only in `src/pages/index.astro`