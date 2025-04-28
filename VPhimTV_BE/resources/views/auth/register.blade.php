<!DOCTYPE html>
<html lang="en">

<head>
    <title>Register | VPhimTV</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="Clean Login Form Responsive, Login " />

    <!-- css files -->
    <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css" media="all">
    <link href="css/login.css" rel="stylesheet" type="text/css" media="all" />
    <link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
    <!-- /css files -->

    <!-- online fonts -->
    <link href="//fonts.googleapis.com/css?family=Sirin+Stencil" rel="stylesheet">
    <!-- online fonts -->

<body>
    <div class="container demo-1">
        <div class="content">
            <div id="large-header" class="large-header">
                <div class="main-agileits">
                    <div class="form-w3-agile">
                        <h2>Register | VPhimTV</h2>
                        <form action="{{ route('register') }}" method="post">
                            @csrf
                            <div class="form-sub-w3">
                                <input type="text" name="name" placeholder="name " required="" />
                                <div class="icon-w3">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="form-sub-w3">
                                <input type="text" name="email" placeholder="email " required="" />
                                <div class="icon-w3">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                </div>
                                @if ($errors->has('email'))
                                <div class="error">{{ $errors->first('email') }}</div>
                                @endif

                            </div>
                            <div class="form-sub-w3">
                                <input type="password" name="password" placeholder="password" required="" />
                                <div class="icon-w3">
                                    <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                                </div>
                            </div>
                            <p class="p-bottom-w3ls">Forgot Password?<a class href="#"> Click here</a></p>
                            <p class="p-bottom-w3ls1"><a class href="/login"> Đăng nhập</a></p>
                            <div class="clear"></div>
                            <div class="submit-w3l">
                                <input type="submit" value="Đăng ký">
                            </div>
                        </form>
                        <div class="social w3layouts">
                            <div class="heading">
                                <h5>Or Login with</h5>
                                <div class="clear"></div>
                            </div>
                            <div class="icons">
                                <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href="#"><i class="fa fa-pinterest-p" aria-hidden="true"></i></a>
                                <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                                <div class="clear"></div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <!--//form-ends-here-->
                </div><!-- copyright -->
                <div class="copyright w3-agile">
                    <p> © 2025 Clean Login Form . All rights reserved | Design by <a href="" target="_blank">VPhimTV</a></p>
                </div>
                <!-- //copyright -->
            </div>
        </div>
    </div>

</body>

</html>