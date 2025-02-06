import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold"/>
      </Container>
      <TopBar/>
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters></Filters>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Пиццы" products={[
                {
                  id: 1, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif', items: [{price: 780}]
                },
                {
                  id: 2, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif', items: [{price: 780}]
                },
                {
                  id: 3, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif', items: [{price: 780}]
                },
                {
                  id: 4, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif', items: [{price: 780}]
                },
              ]} categoryId={1}/>
              <ProductsGroupList title="Комбо" products={[
                {
                  id: 1, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif', items: [{price: 780}]
                },
                {
                  id: 2, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif', items: [{price: 780}]
                },
                {
                  id: 3, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif', items: [{price: 780}]
                },
                {
                  id: 4, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif', items: [{price: 780}]
                },
              ]} categoryId={2}/>
              <ProductsGroupList title="Закуски" products={[
                {
                  id: 1, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif', items: [{price: 780}]
                },
                {
                  id: 2, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif', items: [{price: 780}]
                },
                {
                  id: 3, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif', items: [{price: 780}]
                },
                {
                  id: 4, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif', items: [{price: 780}]
                },
              ]} categoryId={3}/>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
