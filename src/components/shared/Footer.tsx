import { GithubIcon, LinkedinIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="glass bg-background/70 border-t border-border shadow-inner backdrop-blur-md"
      aria-label="Footer"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Omar Ashraf. All rights reserved.</p>

        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/omar-ashraf2"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="h-5 w-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/omar-ashraf-338580182/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
