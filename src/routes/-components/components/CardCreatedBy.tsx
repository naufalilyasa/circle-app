import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import dumbwaysLogo from "@/assets/image/dumbways-logo.png";

function CardCreatedBy() {
  return (
    <>
      <Card className="w-full bg-[#262626] text-[#e8e8e8] border-none">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="flex items-center text-base font-medium gap-2">
            <span>
              Developed By
              <span className="font-bold"> Naufal </span>
            </span>
            <span className="text-xs text-[#B2B2B2]">•</span>
            <a
              href="https://github.com/naufalilyasa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-6 h-6 text-[#B2B2B2] hover:text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/naufalilyasa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-6 h-6 text-[#B2B2B2] hover:text-white" />
            </a>
            <a
              href="https://www.facebook.com/ilyasanaufa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-6 h-6 text-[#B2B2B2] hover:text-white" />
            </a>
            <a
              href="https://www.instagram.com/ilyasa_naufal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6 text-[#B2B2B2] hover:text-white" />
            </a>
          </CardTitle>
          <CardContent className="flex flex-wrap text-[#B2B2B2] text-sm p-0 m-0 gap-1">
            <span className="">Powered by</span>
            <span className="flex items-center px-1">
              <img src={dumbwaysLogo} alt="" className="h-3 w-6" />
            </span>
            <p>DumbWays Indonesia</p>
            <p>•</p>
            <p>#1 Coding Bootcamp</p>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
}

export default CardCreatedBy;
