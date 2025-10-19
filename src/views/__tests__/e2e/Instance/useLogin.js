class useLogin {
    constructur(page) {
        this.page = page
    }

    async gotoLoginPage() {
        const url = 'http://localhost:5173/member-login';
        await this.page.goto(url);
    }

    async loginData() {
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });

        await this.page.fill('[data-test="userId"] input', 'admin');
        await this.page.fill('[data-test="userPw"] input', '1234');
        await this.page.click('[data-test="login"]');
    }
}