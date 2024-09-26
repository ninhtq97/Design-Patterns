abstract class WebTemplate {
  protected renderHeader() {
    console.log('Render Header');
  }

  protected abstract renderBody(): void;

  protected renderFooter() {
    console.log('Render Footer');
  }

  render() {
    this.renderHeader();
    this.renderBody();
    this.renderFooter();
  }
}

class HomePage extends WebTemplate {
  protected renderBody(): void {
    console.log('Render Body Home Page');
  }
}

class ProductPage extends WebTemplate {
  protected renderBody(): void {
    console.log('Render Body Product Page');
  }
}

(() => {
  const homePage = new HomePage();
  homePage.render();

  console.log('');

  const productPage = new ProductPage();
  productPage.render();
})();
