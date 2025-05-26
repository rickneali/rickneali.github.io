---
layout: post
title:  "Third and *mostly* final Step"
date:   2025-05-26 13:31:00 -0500
categories: jekyll update
---

For the third and mostly final step, I had to figure out how to get my Squarespace domain to point to this GitHub page. If you got here using [nickreali.com][nickreali], you know that it worked!

As for how I did it, that's actually kind of boring. At first I did some good old fashioned googling. After that, I came back with a basic idea of how to do it, and I kept some tabs opened that I liked. Ultimately, I went to Gemini and asked it. It came back with instructions that coincided with what I saw and it worked!

I started out by asking `How do I edit my DNS settings for my squarespace domain to point to a GitHub page?`

It followed up with this:

>To edit your DNS settings for your Squarespace domain to point to a GitHub Page, you'll need to configure both your GitHub repository and your Squarespace DNS settings.
>
>Here's a step-by-step guide:
>
>**Part 1: Configure Your GitHub Pages Repository**
>
>1.  **Create a `CNAME` file:**
>    * In the root directory of your GitHub Pages repository, create a new file named `CNAME` (with no file extension).
>    * Inside this `CNAME` file, type your custom domain name (e.g., `www.yourdomain.com` or `yourdomain.com`).
>    * Commit and push this file to your repository's publishing branch (usually `main` or `master`). This tells GitHub Pages to expect traffic from that domain.
>
>2.  **Set the Custom Domain in GitHub Pages Settings:**
>    * Go to your GitHub repository.
>    * Click on **Settings**.
>    * In the left-hand sidebar, click on **Pages**.
>    * Under the "Custom domain" section, enter your custom domain (e.g., `www.yourdomain.com`).
>    * Click **Save**. GitHub will automatically attempt to secure the `www` subdomain if you set an apex domain.
>
>3.  **Enable HTTPS:**
>    * While in the GitHub Pages settings, make sure "Enforce HTTPS" is checked for added security.
>
>**Part 2: Update DNS Settings in Squarespace**
>
>1.  **Log in to your Squarespace account.**
>2.  Go to **Domains** and select the domain you want to use.
>3.  Click on **DNS Settings**.
>4.  **Delete any conflicting existing records:** Squarespace might have default A or CNAME records. Delete any that might conflict with the new GitHub Pages settings.
>5.  **Add the following DNS records:**
>
>    * **A Records (for your apex domain, e.g., `yourdomain.com`):**
>        * **Type:** `A`
>        * **Host:** `@`
>        * **Value:**
>            * `185.199.108.153`
>            * `185.199.109.153`
>            * `185.199.110.153`
>            * `185.199.111.153`
>        * **TTL:** Leave as Default (or a low value like 600 seconds if Squarespace allows for faster propagation, but typically default is fine).
>        * **Important:** Add all four of these A records for redundancy.
>
>    * **CNAME Record (for your `www` subdomain, e.g., `www.yourdomain.com`):**
>        * **Type:** `CNAME`
>        * **Host:** `www`
>        * **Value:** `yourusername.github.io` (replace `yourusername` with your actual GitHub username or organization name).
>        * **TTL:** Leave as Default.
>
>6.  **Save your DNS changes in Squarespace.**
>
>**Part 3: Wait for DNS Propagation and Verify**
>
>* **DNS propagation can take time:** DNS changes can take anywhere from a few minutes to 24-48 hours (or even longer in rare cases) to fully propagate across the internet.
>* **Verify the setup:**
>    * You can use online tools like `whatsmydns.net` to check the propagation status of your DNS records.
>    * Once propagation is complete, try visiting your custom domain in a web browser. You should see your GitHub Pages site.
>    * Also, check the "Custom domain" section in your GitHub Pages settings. It should eventually show "DNS check successful."
>
>**Important Notes:**
>
>* **Case sensitivity:** Ensure your `CNAME` file name is `CNAME` (all uppercase, no extension).
>* **GitHub Pages IP Addresses:** The A record IP addresses are specific to GitHub Pages. It's always a good idea to check the official GitHub Pages documentation for the most up-to-date IP addresses, though the ones listed above are generally current.
>* **Troubleshooting:** If you experience issues, double-check all your record entries, ensure no conflicting records exist, and be patient for DNS propagation. Clearing your browser cache might also help.

Overall, I was pretty happy with that so I went for it. It worked and this is the result. Pretty cool eh?


[nickreali]: https://nickreali.com/
