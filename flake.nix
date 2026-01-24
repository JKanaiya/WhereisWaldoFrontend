{
  description = "Node.js + Prisma development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.11";
  };

  outputs = {
    self,
    nixpkgs,
    ...
  }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs {inherit system;};
  in {
    devShells."${system}".default = pkgs.mkShell {
      packages = with pkgs; [
        nodejs_20
        nodePackages.pnpm
        typescript
      ];

      VITE_BACKEND_URL= "http://localhost:3000/";

      shellHook = ''
          exec zsh
        +  '';
    };
  };
}

