
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class StressTest extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://localhost:3000")
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
    .doNotTrackHeader("1")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0");

	val groceries = csv("pathTo/groceries.csv").random;


//change session cookie and cartCode before using

  private val scn = scenario("StressTest")
    .exec(addCookie(Cookie("session", "$90620204-bbbe-42fb-afb0-46d007faea6d")))
  	.feed(groceries)
    .pause(1)
    .exec(
      http("updating home page")
        .get("/cart-data?cart=VIQ1B2")
    )
    .pause(1)
    .exec(
      http("adding item")
        .post("/add-item")
        .body(StringBody("""{"itemType":"#{type}", "itemName":"#{item}", "cartCode":"VIQ1B2"}""")).asJson
    )
    .pause(1)
    .exec(
      http("deleting item")
        .post("/remove-item")
		.body(StringBody("""{"itemType":"#{type}", "itemName":"#{item}","cartCode":"VIQ1B2"}""")).asJson
	)
    .pause(1)
    .exec(
      http("updating home page")
        .get("/cart-data?cart=VIQ1B2")
    )


  setUp(scn.inject(rampUsersPerSec(2).to(100).during(1.minutes))).protocols(httpProtocol)
}
